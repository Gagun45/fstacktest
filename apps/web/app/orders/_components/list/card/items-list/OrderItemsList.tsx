import { IOrderItem } from "@repo/shared";
import OrderItemCard from "./item-card/OrderItemCard";

interface Props {
  items: IOrderItem[];
}

const OrderItemsList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-4 border p-2 border-b-blue-600">
      {items.map((item) => (
        <OrderItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderItemsList;
