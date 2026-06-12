// OrderItems.tsx

import { IOrderItem } from "@repo/shared";
import OrderItemCard from "./item-card/OrderItemCard";

interface Props {
  items: IOrderItem[];
}

const OrderItemsList = ({ items }: Props) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-medium">Items</h2>

      <div className="rounded-lg border divide-y">
        {items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default OrderItemsList;
