"use client";

import Loader from "@/components/general/Loader";
import { Button } from "@/components/ui/button";
import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { useProducts } from "@/features/products/hooks/queries/use-products";
import ProductFilters from "./filters/ProductFilters";
import ProductsList from "./list/ProductsList";
import SelectComponent from "@/components/sorting/SelectComponent";
import { useProductsQuery } from "@/features/products/lib/use-products-query";

const Products = () => {
  const { query, setSorting } = useProductsQuery();

  const { order, sortBy } = query;

  const sortValue = `${sortBy}-${order}`;

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(query);

  if (status === "error") return <p>Error loading products.</p>;

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <ProductFilters />

      {status === "pending" ? (
        <Loader />
      ) : products.length === 0 ? (
        <p>No products found satisfying filters</p>
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
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more
        </Button>
      )}
    </>
  );
};

export default Products;
