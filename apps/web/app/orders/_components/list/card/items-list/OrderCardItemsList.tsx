import { IOrderItem } from "@repo/shared";
import OrderItemCard from "./item-card/OrderItemCard";

interface Props {
  items: IOrderItem[];
}

const OrderCardItemsList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <OrderItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderCardItemsList;
