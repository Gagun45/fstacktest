import { ISaleOrder } from "@repo/shared";
import SaleCard from "./card/SaleCard";
import { Accordion } from "@/components/ui/accordion";

interface Props {
  sales: ISaleOrder[];
}

const SalesList = ({ sales }: Props) => {
  return (
    <Accordion type="single" collapsible className="gap-8">
      {sales.map((sale) => (
        <SaleCard key={sale.id} sale={sale} />
      ))}
    </Accordion>
  );
};

export default SalesList;
