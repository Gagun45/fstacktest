import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderItemUpdateStatus } from "@/features/orders/hooks/mutations/use-upd-status";
import { IOrderItemStatus, ORDER_ITEM_STATUSES } from "@repo/shared";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  orderItemId: number;
  currentStatus: IOrderItemStatus;
}

const StatusUpdate = ({ orderItemId, currentStatus }: Props) => {
  const { mutate } = useOrderItemUpdateStatus();
  const [status, setStatus] = useState<IOrderItemStatus>(currentStatus);
  const onUpdate = () => {
    mutate(
      {
        dto: {
          status,
        },
        orderItemId,
      },
      {
        onSuccess: () => {
          toast.success("edited!");
        },
        onError: (e) => {
          const msg = e.response?.data.message ?? "Something went wrong";
          toast.error(msg);
        },
      },
    );
  };
  return (
    <div>
      <Select
        value={status}
        onValueChange={(val) => setStatus(val as IOrderItemStatus)}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {ORDER_ITEM_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={onUpdate} disabled={status === currentStatus}>
        Update status to: {status}
      </Button>
    </div>
  );
};

export default StatusUpdate;
