import { Badge } from "@/components/ui/badge";
import { IOrderItem } from "@repo/shared";

interface Props {
  item: IOrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  return (
    <div
      key={item.id}
      className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="space-y-1">
        <p className="font-medium">{item.title}</p>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Qty: {item.quantity}</span>

          <span>${item.priceAtTime.toFixed(2)} each</span>
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <Badge>{item.status}</Badge>
          </div>
        </div>
      </div>

      <p className="font-medium">
        ${(item.quantity * item.priceAtTime).toFixed(2)}
      </p>
    </div>
  );
};

export default OrderItemCard;
