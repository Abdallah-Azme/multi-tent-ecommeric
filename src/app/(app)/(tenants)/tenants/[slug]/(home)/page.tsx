import { loadProductsFilters } from "@/modules/products/hooks/search-params";
import ProductListView from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import React from "react";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ searchParams, params }: Props) {
  const { slug } = await params;
  const filters = await loadProductsFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: Number(
        process.env.NEXT_PUBLIC_NUMBER_OF_PAGNATIED_ITEMES_PER_PAGE
      ),
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
}
