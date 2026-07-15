import { OrderItemStatus, OrderStatus } from "@prisma/client";

export const calculateGlobalOrderStatus = (
  itemStatuses: OrderItemStatus[],
): OrderStatus => {
  if (itemStatuses.length === 0) return "PROCESSING";

  if (itemStatuses.every((status) => status === "CANCELLED")) {
    return "CANCELLED";
  }

  const allItemsResolved = itemStatuses.every(
    (status) => status === "DELIVERED" || status === "CANCELLED",
  );

  if (allItemsResolved) {
    return "DELIVERED";
  }

  return "PROCESSING";
};
