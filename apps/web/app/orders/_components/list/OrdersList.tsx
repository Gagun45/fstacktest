import { IOrder } from "@repo/shared";
import OrderCard from "./card/OrderCard";
import { Accordion } from "@/components/ui/accordion";

interface Props {
  orders: IOrder[];
}

const OrdersList = ({ orders }: Props) => {
  return (
    <Accordion type="single" collapsible className="gap-8">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Accordion>
  );
};

export default OrdersList;
