// OrderHeader.tsx

import { Badge } from "@/components/ui/badge";
import { convertDate } from "@/lib/date.converter";
import { IOrder } from "@repo/shared";

interface Props {
  order: IOrder;
}

const OrderHeader = ({ order }: Props) => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Order #{order.id}</h1>

      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        <span>Created: {convertDate(order.createdAt)}</span>

        <div className="flex gap-2 items-center">
          <span>Status:</span>
          <Badge>{order.status}</Badge>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
