import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { convertDate } from "@/lib/date.converter";
import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderCardHeader = ({ order }: Props) => {
  const createdAt = convertDate(order.createdAt);

  return (
    <CardHeader className="flex-1 px-0">
      <CardTitle>Order #{order.id}</CardTitle>

      <CardDescription>Created: {createdAt}</CardDescription>

      <Badge>{order.status}</Badge>
    </CardHeader>
  );
};

export default OrderCardHeader;
