"use client";

import PriceRange from "@/components/price-range/PriceRange";
import TypeFilter from "@/components/category/TypeFilter";
import { useProductQuery } from "@/features/products/lib/use-product-query";
import { Button } from "@/components/ui/button";

export default function ProductFilters() {
  const { query, setPricing, setTypes, resetQuery } = useProductQuery();
  const { minPrice, maxPrice, types = [] } = query;
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-80 space-y-6">
        <PriceRange
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 15000}
          onChange={setPricing}
        />
        <TypeFilter value={types} onChange={setTypes} />
      </div>
      <Button onClick={resetQuery}>Reset</Button>

      {/* You can add more filters here later: Brands, Rating, etc. */}
    </div>
  );
}
