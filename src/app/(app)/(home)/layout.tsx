import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import SearchFilters, { SearchFiltersLoading } from "./search-filters";

export default async function HomeLayout({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </section>
  );
}
