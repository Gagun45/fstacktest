"use client";

import OrderCardDetails from "@/app/orders/_components/list/card/details/OrderCardDetails";
import OrderCardHeader from "@/app/orders/_components/list/card/header/OrderCardHeader";
import OrderCardItemsList from "@/app/orders/_components/list/card/items-list/OrderCardItemsList";
import OrderCardTotal from "@/app/orders/_components/list/card/total/OrderCardTotal";
import Loader from "@/components/general/Loader";
import StateScreen from "@/components/general/StateScreen";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <Card className="w-full p-6">
      <OrderCardHeader order={order} />

      <CardContent className="space-y-6 pt-0">
        <OrderCardDetails order={order} />

        <OrderCardItemsList items={order.items} />

        <OrderCardTotal total={order.total} />
      </CardContent>
    </Card>
    // <div className="space-y-8 w-full">
    //   <OrderHeader order={order} />

    //   <OrderItemsList items={order.items} />

    //   <OrderShipping order={order} />

    //   <OrderSummary total={order.total} />
    // </div>
  );
};

export default Order;
