"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";
import PriceFilter from "./price-filter";
import { useProductsFilter } from "../../hooks/use-products-filter";
import TagsFilter from "./tags-filter";

interface ProductFiltersProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

function ProductFilter({ children, title, className }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronUpIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
}

export default function ProductFilters({}) {
  const [filters, setFilters] = useProductsFilter();

  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false;

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    if (typeof value === "string") {
      return value !== "";
    }
    return value !== null;
  });

  console.log({ hasAnyFilters });
  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium ">Filters</p>
        {hasAnyFilters && (
          <button
            className="underline cursor-pointer"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <ProductFilter title="Price" className="">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(price) => onChange("minPrice", price)}
          onMaxPriceChange={(price) => onChange("maxPrice", price)}
        />
      </ProductFilter>
      <ProductFilter title="tags" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onChange={(tags) => onChange("tags", tags)}
        />
      </ProductFilter>
    </div>
  );
}
