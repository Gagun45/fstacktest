import { OrderItemStatus, OrderStatus } from "@prisma/client";

export const calculateGlobalOrderStatus = (
    itemStatuses: OrderItemStatus[],
): OrderStatus => {
    if (itemStatuses.length === 0) return "PENDING";

    // 1. All Cancelled
    if (itemStatuses.every((s) => s === "CANCELLED")) {
        return "CANCELLED";
    }

    // 2. All completed/resolved
    if (
        itemStatuses.every((s) =>
            ["DELIVERED", "CANCELLED", "REFUNDED"].includes(s),
        )
    ) {
        return "DELIVERED";
    }

    // 3. All out for delivery or finished
    if (
        itemStatuses.every((s) =>
            ["SHIPPED", "DELIVERED", "CANCELLED"].includes(s),
        )
    ) {
        return "SHIPPED";
    }

    // 4. Any item still waiting to be touched
    if (itemStatuses.some((s) => s === "PENDING")) {
        return "PENDING";
    }

    // 5. Default catch-all (some items are being worked on)
    return "PROCESSING";
};
