import { ISaleItem } from "@repo/shared";
import SaleItemCard from "./card/SaleItemCard";

interface Props {
  items: ISaleItem[];
}

const SaleItemsList = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-4 border-t border-dashed border-b py-4">
      {items.map((item) => (
        <SaleItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SaleItemsList;
