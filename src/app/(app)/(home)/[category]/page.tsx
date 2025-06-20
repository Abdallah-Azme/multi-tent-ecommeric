import ProductList, {
  ProductListSkelton,
} from "@/modules/products/ui/components/product-list";
import ProductsFilters from "@/modules/products/ui/components/product-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { SearchParams } from "nuqs/server";
import { loadProductsFilters } from "@/modules/products/hooks/search-params";
import ProductSort from "@/modules/products/ui/components/product-sort";

interface Props {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<SearchParams>;
}

export default async function Page({ params, searchParams }: Props) {
  const { category } = await params;
  const filters = await loadProductsFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
          {/* sorting */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
            <p className="text-2xl font-medium">created for you</p>
            <ProductSort />
          </div>

          <div className="grid lg:grid-cols-5 xl:grid-cols-8 gap-y-6 gap-x-12">
            <div className="lg:col-span-2 xl:col-span-2">
              <ProductsFilters />
            </div>

            <div className="lg:col-span-5 xl:col-span-6">
              <Suspense fallback={<ProductListSkelton />}>
                <ProductList category={category} />
              </Suspense>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}
