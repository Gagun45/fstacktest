import { z } from "zod";
import { ORDER_ITEM_STATUSES } from "../types/order-item.types";

export const orderItemStatusSchema = z.object({
  status: z.enum(ORDER_ITEM_STATUSES),
});

// Rename to UpdateOrderItemStatusDto if used exclusively for updates
export type OrderItemStatusDto = z.infer<typeof orderItemStatusSchema>;
