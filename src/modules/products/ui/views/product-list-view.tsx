import React, { Suspense } from "react";
import ProductSort from "../components/product-sort";
import ProductList, { ProductListSkelton } from "../components/product-list";
import ProductFilters from "../components/product-filters";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export default function ProductListView({
  category,
  tenantSlug,
  narrowView,
}: Props) {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      {/* sorting */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">created for you</p>
        <ProductSort />
      </div>

      <div className="grid lg:grid-cols-5 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>

        <div className="lg:col-span-5 xl:col-span-6">
          <Suspense fallback={<ProductListSkelton narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
