"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductsFilter } from "../../hooks/use-products-filter";
import ProductCard, { ProductCardSkelton } from "./product-card";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export default function ProductList({
  category,
  tenantSlug,
  narrowView,
}: Props) {
  const [filters] = useProductsFilter();
  const trpc = useTRPC();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          category,
          ...filters,
          tenantSlug,
          limit: Number(
            process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE
          ),
        },
        {
          getNextPageParam: (lastPage) =>
            lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
        }
      )
    );

  console.log({ data });

  if (data.pages.at(0)?.docs.length === 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium ">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3"
        )}
      >
        {data.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant.slug}
              tenantImageUrl={product.tenant.image?.url}
              reviewRating={3}
              reviewCount={5}
              price={product.price}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="font-medium disabled:opacity-50 text-base bg-white "
            type="button"
            variant={"elevated"}
          >
            Load more...
          </Button>
        )}
      </div>
    </>
  );
}

export function ProductListSkelton({ narrowView }: { narrowView?: boolean }) {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3"
      )}
    >
      {Array.from({
        length: Number(
          process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE
        ),
      }).map((_, i) => (
        <ProductCardSkelton key={i} />
      ))}
    </div>
  );
}
