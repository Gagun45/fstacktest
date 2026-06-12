import { ISaleOrder } from "@repo/shared";
import SaleItemsList from "./list/SaleItemsList";
import SaleHeader from "./header/SaleHeader";
import SaleShippingInfo from "./shipping-info/SaleShippingInfo";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  sale: ISaleOrder;
}
const SaleCard = ({ sale }: Props) => {
  return (
    <AccordionItem value={String(sale.id)} className="border-none">
      <Card>
        <AccordionTrigger className="px-4">
          <SaleHeader sale={sale} />
        </AccordionTrigger>

        <AccordionContent>
          <CardContent className="space-y-6 pt-0">
            <SaleShippingInfo shippingInfo={sale.shippingInfo} />
            <SaleItemsList items={sale.items} />
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default SaleCard;
