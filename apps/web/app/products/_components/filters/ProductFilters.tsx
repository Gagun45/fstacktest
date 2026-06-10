"use client";

import PriceRange from "@/components/price-range/PriceRange";
import TypeFilter from "@/components/category/TypeFilter";
import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/features/products/lib/use-products-query";

export default function ProductFilters() {
  const { query, setPricing, setTypes, resetQuery } = useProductsQuery();
  const { minPrice, maxPrice, types = [] } = query;
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="space-y-4">
        <PriceRange
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 15000}
          onChange={setPricing}
        />

        <TypeFilter value={types} onChange={setTypes} />
      </div>

      <Button variant="outline" onClick={resetQuery} className="max-w-fit">
        Reset
      </Button>
    </div>
  );
}
