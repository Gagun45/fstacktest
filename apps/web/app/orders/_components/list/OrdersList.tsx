import { IOrder } from "@repo/shared";
import OrderCard from "./card/OrderCard";

interface Props {
  orders: IOrder[];
}

const OrdersList = ({ orders }: Props) => {
  return (
    <div className="flex flex-wrap gap-4 border p-2">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;
