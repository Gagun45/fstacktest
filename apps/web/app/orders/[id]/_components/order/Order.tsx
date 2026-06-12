"use client";

import Loader from "@/components/general/Loader";
import StateScreen from "@/components/general/StateScreen";
import { useOrder } from "@/features/orders/hooks/queries/use-order";

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

  return <div>Order - {orderId}</div>;
};

export default Order;
