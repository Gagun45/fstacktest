import { IOrder } from "@repo/shared";
import OrderItemsList from "./items-list/OrderItemsList";

interface Props {
  order: IOrder;
}

const OrderCard = ({ order }: Props) => {
  const createdAt = new Date(order.createdAt);
  return (
    <div className="border border-amber-300">
      <p>Order #{order.id}</p>
      <p>Total: {order.total}</p>
      <p>Created: {createdAt.toDateString()}</p>
      <p>Status: {order.status}</p>
      <OrderItemsList items={order.items} />
    </div>
  );
};

export default OrderCard;
