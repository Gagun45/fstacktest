"use client";

import Loader from "@/components/general/Loader";
import { useSales } from "@/features/orders/hooks/queries/use-sales";
import SalesList from "./list/SalesList";
import StateScreen from "@/components/general/StateScreen";

const Sales = () => {
  const { data: sales, isLoading, isError } = useSales();
  if (isLoading) return <Loader />;
  if (isError || !sales) {
    return (
      <StateScreen
        title="Couldn't load your sales"
        description="Please try again in a moment."
      />
    );
  }

  if (sales.length === 0) {
    return (
      <StateScreen
        title="No sales yet"
        description="Once someone purchases your products, they'll appear here."
      />
    );
  }
  return <SalesList sales={sales} />;
};

export default Sales;
