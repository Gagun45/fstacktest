import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { IOrder } from "@repo/shared";
import OrderDetails from "./details/OrderDetails";
import OrderHeader from "./header/OrderHeader";
import OrderItemsList from "./items-list/OrderItemsList";
import OrderTotal from "./total/OrderTotal";

interface Props {
  order: IOrder;
}

const OrderCard = ({ order }: Props) => {
  return (
    <AccordionItem value={`order-${order.id}`} className="border-none">
      <Card>
        <AccordionTrigger>
          <OrderHeader order={order} />
        </AccordionTrigger>

        <AccordionContent>
          <CardContent className="space-y-6 pt-0">
            <OrderDetails order={order} />

            <OrderItemsList items={order.items} />

            <OrderTotal total={order.total} />
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default OrderCard;
