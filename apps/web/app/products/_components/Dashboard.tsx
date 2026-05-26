"use client";

import Loader from "@/components/general/Loader";
import SortSelect from "@/components/sorting/SortSelect";
import { Button } from "@/components/ui/button";
import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";
import { useProducts } from "@/features/products/hooks/queries/use-products";
import { useProductQuery } from "@/features/products/lib/use-product-query";
import ProductFilters from "./filters/ProductFilters";
import ProductsList from "./list/ProductsList";

const Dashboard = () => {
  const { query, setSorting } = useProductQuery();

  const { order, sortBy } = query;

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(query);

  if (status === "error") return <p>Error loading products.</p>;

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <SortSelect
        order={order}
        sortBy={sortBy}
        options={PRODUCT_SORT_OPTIONS}
        onChange={setSorting}
      />
      <ProductFilters />

      {status === "pending" ? (
        <Loader />
      ) : products.length === 0 ? (
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
