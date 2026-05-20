"use client";

import Loader from "@/components/general/Loader";
import { useOrders } from "@/features/orders/hooks/queries/useOrders";
import OrdersList from "./list/OrdersList";

const Orders = () => {
  const { data: orders, isLoading } = useOrders();
  if (isLoading) return <Loader />;
  if (!orders) return <p>Failed to load data</p>;
  if (orders.length === 0) return <p>No orders yet</p>;
  return (
    <>
      <OrdersList orders={orders} />
    </>
  );
};

export default Orders;
