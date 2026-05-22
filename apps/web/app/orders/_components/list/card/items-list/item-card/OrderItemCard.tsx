import { IOrderItem } from "@repo/shared";

interface Props {
  item: IOrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  const updatedAt = new Date(item.updatedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="border">
      <p>Item title: {item.title}</p>
      <p>Update: {updatedAt}</p>
      <p>
        Quantity: {item.quantity}, price: {item.priceAtTime}
      </p>
      <p>Status: {item.status}</p>
    </div>
  );
};

export default OrderItemCard;
