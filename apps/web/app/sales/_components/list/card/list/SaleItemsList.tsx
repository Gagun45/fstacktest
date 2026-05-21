import { ISaleItem } from "@repo/shared";
import SaleItemCard from "./card/SaleItemCard";

interface Props {
  items: ISaleItem[];
}

const SaleItemsList = ({ items }: Props) => {
  return (
    <div className="bg-gray-600 p-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <SaleItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SaleItemsList;
