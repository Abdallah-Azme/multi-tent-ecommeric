"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";
import PriceFilter from "./price-filter";
import { useProductsFilter } from "../../hooks/use-products-filter";

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
        <button className="underline" onClick={() => {}} type="button">
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(price) => onChange("minPrice", price)}
          onMaxPriceChange={(price) => onChange("maxPrice", price)}
        />
      </ProductFilter>
    </div>
  );
}
