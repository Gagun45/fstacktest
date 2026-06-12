import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { IOrder } from "@repo/shared";
import OrderCardDetails from "./details/OrderCardDetails";
import OrderCardItemsList from "./items-list/OrderCardItemsList";
import OrderCardTotal from "./total/OrderCardTotal";
import Link from "next/link";
import { frontendUrls } from "@/lib/frontendUrls";
import OrderCardHeader from "./header/OrderCardHeader";

interface Props {
  order: IOrder;
}

const OrderCard = ({ order }: Props) => {
  return (
    <AccordionItem value={`order-${order.id}`} className="border-none">
      <Card>
        <AccordionTrigger className="px-4">
          <OrderCardHeader order={order} />
        </AccordionTrigger>

        <AccordionContent>
          <CardContent className="space-y-6 pt-0">
            <OrderCardDetails order={order} />

            <OrderCardItemsList items={order.items} />

            <OrderCardTotal total={order.total} />
            <Link href={frontendUrls.orders.order(order.id)}>View details</Link>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default OrderCard;
