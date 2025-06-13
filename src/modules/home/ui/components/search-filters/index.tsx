"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Categories from "./categories";
import SearchInput from "./search-input";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import BreadcrumbNavigation from "./breadcrumb-navigation";

export default function SearchFilters() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const params = useParams();

  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data?.find((cat) => cat.slug === activeCategory);
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name;
  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName = activeCategoryData?.subcategories.find(
    (cat) => cat.slug === activeSubcategory
  )?.name;
  return (
    <div
      style={{ backgroundColor: activeCategoryColor }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput />
      <div className="hidden lg:block">
        {/* @ts-expect-error  some data checking issue need to be debugged most likely because of subcategory feature*/}
        <Categories data={data} />
        <BreadcrumbNavigation
          activeCategory={activeCategory}
          activeCategoryName={activeCategoryName}
          activeSubcategoryName={activeSubcategoryName}
        />
      </div>
    </div>
  );
}

export function SearchFiltersLoading() {
  return (
    <div
      style={{ backgroundColor: DEFAULT_BG_COLOR }}
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
}
