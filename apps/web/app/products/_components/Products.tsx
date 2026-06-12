"use client";

import Loader from "@/components/general/Loader";
import { Button } from "@/components/ui/button";
import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { useProducts } from "@/features/products/hooks/queries/use-products";
import ProductFilters from "./filters/ProductFilters";
import ProductsList from "./list/ProductsList";
import SelectComponent from "@/components/sorting/SelectComponent";
import { useProductsQuery } from "@/features/products/lib/use-products-query";
import StateScreen from "@/components/general/StateScreen";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Products = () => {
  const { query, setSorting, resetQuery } = useProductsQuery();

  const { order, sortBy } = query;

  const sortValue = `${sortBy}-${order}`;

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(query);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "error") {
    return (
      <StateScreen
        title="Couldn't load your products"
        description="Please try again in a moment."
      />
    );
  }

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <ProductFilters />

      {status === "pending" ? (
        <Loader />
      ) : products.length === 0 ? (
        <StateScreen
          title="No products match your filters"
          description="Try changing sorting or removing filters to see more results."
          action={<Button onClick={resetQuery}>Reset sorting</Button>}
        />
      ) : (
        <div className="flex flex-col justify-center w-full mt-4 gap-3">
          <div className="flex justify-end">
            <SelectComponent
              options={PRODUCT_SORT_OPTIONS}
              onChange={setSorting}
              value={sortValue}
            />
          </div>

          <ProductsList products={products} />
        </div>
      )}
      {hasNextPage && <div ref={ref} className="h-1" />}

      {isFetchingNextPage && <Loader />}
      {!hasNextPage && products.length > 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          You&apos;ve reached the end of the catalog.
        </p>
      )}
    </>
  );
};

export default Products;
