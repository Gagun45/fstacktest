import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderHeader = ({ order }: Props) => {
  const createdAt = new Date(order.createdAt);

  return (
    <CardHeader>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Order #{order.id}</CardTitle>

          <CardDescription>
            Placed on {createdAt.toLocaleDateString()}
          </CardDescription>
        </div>

        <Badge>{order.status}</Badge>
      </div>
    </CardHeader>
  );
};

export default OrderHeader;
