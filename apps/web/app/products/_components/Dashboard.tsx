"use client";

import Loader from "@/components/general/Loader";
import { useProductFilters } from "@/features/products/lib/use-prod-filters";
import DashboardCardsList from "./list/DashboardCardsList";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/hooks/queries/use-products";

const Dashboard = () => {
  const { filters } = useProductFilters();

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useProducts(filters);

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading products.</p>;

  const products = data.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <DashboardCardsList products={products} />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load more
        </Button>
      )}
    </>
  );
};

export default Dashboard;
