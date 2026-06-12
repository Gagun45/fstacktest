"use client";

import Loader from "@/components/general/Loader";
import StateScreen from "@/components/general/StateScreen";
import { useOrder } from "@/features/orders/hooks/queries/use-order";
import OrderHeader from "./header/OrderHeader";
import OrderItemsList from "./items-list/OrderItemsList";
import OrderShipping from "./shipping/OrderShipping";
import OrderSummary from "./summary/OrderSummary";

interface Props {
  orderId: number;
}

const Order = ({ orderId }: Props) => {
  const { data: order, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !order) {
    return (
      <StateScreen
        title="Couldn't load this order"
        description="Please try again in a moment."
      />
    );
  }

  return (
    <div className="space-y-8 w-full">
      <OrderHeader order={order} />

      <OrderItemsList items={order.items} />

      <OrderShipping order={order} />

      <OrderSummary total={order.total} />
    </div>
  );
};

export default Order;
