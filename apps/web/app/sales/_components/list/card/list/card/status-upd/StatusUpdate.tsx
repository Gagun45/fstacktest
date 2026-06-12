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
import { X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  orderItemId: number;
  currentStatus: IOrderItemStatus;
}

const StatusUpdate = ({ orderItemId, currentStatus }: Props) => {
  const { mutate, isPending } = useOrderItemUpdateStatus();

  const [status, setStatus] = useState<IOrderItemStatus>(currentStatus);
  const hasChanges = status !== currentStatus;
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
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Select
        value={status}
        onValueChange={(val) => setStatus(val as IOrderItemStatus)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {ORDER_ITEM_STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Button onClick={onUpdate} disabled={!hasChanges || isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
        {hasChanges && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setStatus(currentStatus)}
            disabled={isPending}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatusUpdate;
