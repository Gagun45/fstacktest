"use client";

import Loader from "@/components/general/Loader";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/hooks/queries/use-products";
import ProductsList from "./list/ProductsList";
import { useProductQuery } from "@/features/products/lib/use-product-query";
import SortSelect from "@/components/sorting/SortSelect";
import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import PriceRange from "@/components/price-range/PriceRange";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Dashboard = () => {
  const { query, setSorting, setPricing } = useProductQuery();

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(query);

  const { order, sortBy, minPrice, maxPrice } = query;
  const [priceRange, setPriceRange] = useState({
    minPrice: minPrice ?? 0,
    maxPrice: maxPrice ?? 15000,
  });
  const [debounedPriceRange] = useDebounce(priceRange, 500);
  useEffect(() => {
    setPricing(priceRange);
  }, [debounedPriceRange]);

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading products.</p>;

  const products = data.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <SortSelect
        order={order}
        sortBy={sortBy}
        options={PRODUCT_SORT_OPTIONS}
        onChange={setSorting}
      />
      <PriceRange
        minPrice={priceRange.minPrice}
        maxPrice={priceRange.maxPrice}
        onChange={setPriceRange}
      />
      {products.length === 0 ? (
        <p>No products found satisfying filters</p>
      ) : (
        <ProductsList products={products} />
      )}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more
        </Button>
      )}
    </>
  );
};

export default Dashboard;
