"use client";

import Loader from "@/components/general/Loader";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/hooks/queries/use-products";
import ProductsList from "./list/ProductsList";
import { useProductQuery } from "@/features/products/lib/use-product-query";
import SortSelect from "@/components/sorting/SortSelect";
import { PRODUCT_SORT_OPTIONS } from "@/constants/sort.options";

const Dashboard = () => {
  const { query, setSorting } = useProductQuery();

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(query);

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading products.</p>;

  const products = data.pages.flatMap((page) => page.data) ?? [];
  const { order, sortBy } = query;
  return (
    <>
      <SortSelect
        order={order}
        sortBy={sortBy}
        options={PRODUCT_SORT_OPTIONS}
        onChange={setSorting}
      />
      <ProductsList products={products} />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more
        </Button>
      )}
    </>
  );
};

export default Dashboard;
