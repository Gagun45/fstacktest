import { ISaleOrder } from "@repo/shared";
import SaleCard from "./card/SaleCard";

interface Props {
  sales: ISaleOrder[];
}

const SalesList = ({ sales }: Props) => {
  return (
    <div className="flex flex-wrap gap-4">
      {sales.map((sale) => (
        <SaleCard key={sale.id} sale={sale} />
      ))}
    </div>
  );
};

export default SalesList;
