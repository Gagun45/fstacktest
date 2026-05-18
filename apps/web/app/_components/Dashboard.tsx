"use client";

import Loader from "@/components/general/Loader";
import { useDashboardCards } from "@/features/products/hooks/use-dashb-cards";
import { useProductFilters } from "@/features/products/lib/use-prod-filters";
import DashboardCardsList from "./list/DashboardCardsList";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { filters } = useProductFilters();

  const { data, fetchNextPage, status, hasNextPage, isFetchingNextPage } =
    useDashboardCards(filters);

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
