import { Badge } from "@/components/ui/badge";
import { frontendUrls } from "@/lib/frontendUrls";
import { IOrderItem } from "@repo/shared";
import Link from "next/link";

interface Props {
  item: IOrderItem;
}

const OrderItemCard = ({ item }: Props) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border p-4">
      <div className="min-w-0 flex-1">
        <Link
          href={frontendUrls.products.details(item.productId)}
          className="font-medium"
        >
          {item.title}
        </Link>

        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Qty: {item.quantity}</span>

          <span>Unit price: ${item.priceAtTime.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <Badge variant="outline">{item.status}</Badge>

        <span className="font-semibold">
          ${(item.quantity * item.priceAtTime).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderItemCard;
