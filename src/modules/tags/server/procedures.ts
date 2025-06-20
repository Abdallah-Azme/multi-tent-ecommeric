import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const tagsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z
          .number()
          .default(
            Number(process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE)
          ),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
      });

      return data;
    }),
});
