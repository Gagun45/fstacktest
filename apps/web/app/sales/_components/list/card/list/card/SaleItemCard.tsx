import { ISaleItem } from "@repo/shared";
import StatusUpdate from "./status-upd/StatusUpdate";

interface Props {
  item: ISaleItem;
}

const SaleItemCard = ({ item }: Props) => {
  return (
    <div className="bg-yellow-800 p-2 border">
      <p>
        {item.title} for ${item.priceAtTime} x {item.quantity}
      </p>
      <StatusUpdate currentStatus={item.status} orderItemId={item.id} />
    </div>
  );
};

export default SaleItemCard;
