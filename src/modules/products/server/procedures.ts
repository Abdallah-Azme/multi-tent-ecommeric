import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";
import { sortValues } from "../hooks/search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z
          .number()
          .default(
            Number(process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE)
          ),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.string().array().nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort) {
        switch (input.sort) {
          case "curated":
            sort = "-createdAt";
            break;
          case "trending":
            sort = "-views";
            break;
          case "hot_and_new":
            sort = "-createdAt";
            break;
        }
      }

      if (input.minPrice && input.maxPrice) {
        where["price"] = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where["price"] = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where["price"] = {
          less_than_equal: input.maxPrice,
        };
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      }

      if (input.category) {
        const categoryData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoryData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));
        const subCategoriesSlug = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subCategoriesSlug.push(
            ...parentCategory.subcategories.map(
              (subCategory) => subCategory.slug
            )
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subCategoriesSlug],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
