import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderHeader = ({ order }: Props) => {
  const createdAt = new Date(order.createdAt);

  return (
    <CardHeader className="flex-1 px-0">
      <CardTitle>Order #{order.id}</CardTitle>

      <CardDescription>
        Placed on {createdAt.toLocaleDateString()}
      </CardDescription>

      <Badge>{order.status}</Badge>
    </CardHeader>
  );
};

export default OrderHeader;
