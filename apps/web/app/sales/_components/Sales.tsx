"use client";

import Loader from "@/components/general/Loader";
import { useSales } from "@/features/orders/hooks/queries/use-sales";
import SalesList from "./list/SalesList";

const Sales = () => {
  const { data: sales, isLoading } = useSales();
  if (isLoading) return <Loader />;
  if (!sales) return <p>Failed to load data</p>;
  if (sales.length === 0) return <p>No sales yet</p>;
  return <SalesList sales={sales} />;
};

export default Sales;
