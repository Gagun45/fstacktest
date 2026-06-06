import { convertDate } from "@/lib/date.converter";
import { IOrderItem } from "@repo/shared";

interface Props {
  item: IOrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  const updatedAt = convertDate(item.updatedAt);
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
