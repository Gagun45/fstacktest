"use client";

import Loader from "@/components/general/Loader";
import OrdersList from "./list/OrdersList";
import { useOrders } from "@/features/orders/hooks/queries/use-orders";
import StateScreen from "@/components/general/StateScreen";

const Orders = () => {
  const { data: orders, isLoading, isError } = useOrders();
  if (isLoading) return <Loader />;
  if (isError || !orders) {
    return (
      <StateScreen
        title="Couldn't load your orders"
        description="Please try again in a moment."
      />
    );
  }

  if (orders.length === 0) {
    return (
      <StateScreen
        title="You haven't placed any orders yet"
        description="Once you make a purchase, your orders will appear here."
      />
    );
  }

  return <OrdersList orders={orders} />;
};

export default Orders;
