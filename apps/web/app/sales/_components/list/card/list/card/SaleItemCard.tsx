import { ISaleItem } from "@repo/shared";

interface Props {
  item: ISaleItem;
}

const SaleItemCard = ({ item }: Props) => {
  return (
    <div className="bg-yellow-800 p-2 border">
      <p>
        {item.title} for ${item.priceAtTime} x {item.quantity}
      </p>
    </div>
  );
};

export default SaleItemCard;
