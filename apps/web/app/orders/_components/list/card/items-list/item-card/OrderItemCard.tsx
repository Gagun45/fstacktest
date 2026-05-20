import { IOrderItem } from "@repo/shared";

interface Props {
  item: IOrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  return (
    <div className="border">
      <p>Item title: {item.title}</p>
      <p>
        Quantity: {item.quantity}, price: {item.priceAtTime}
      </p>
      <p>Status: {item.status}</p>
    </div>
  );
};

export default OrderItemCard;
