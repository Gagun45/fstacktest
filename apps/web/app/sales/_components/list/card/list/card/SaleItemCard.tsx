import { Badge } from "@/components/ui/badge";
import { ISaleItem } from "@repo/shared";
import StatusUpdate from "./status-upd/StatusUpdate";

interface Props {
  item: ISaleItem;
}

const SaleItemCard = ({ item }: Props) => {
  return (
    <div className="flex flex-col gap-3 border-b py-3 last:border-b-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">{item.title}</p>

          <p className="text-sm text-muted-foreground">
            Qty: {item.quantity} • ${item.priceAtTime.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Status:</span>

          <Badge variant="default">{item.status}</Badge>
        </div>
      </div>

      <StatusUpdate currentStatus={item.status} orderItemId={item.id} />
    </div>
  );
};

export default SaleItemCard;
