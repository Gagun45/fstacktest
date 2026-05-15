export const ORDER_ITEM_STATUSES = [
  "PENDING",
  "CANCELLED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "REFUNDED",
] as const;

export type IOrderItemStatus = (typeof ORDER_ITEM_STATUSES)[number];

export interface IOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  priceAtTime: number;
  title: string;
  status: IOrderItemStatus;
  createdAt: Date;
  updatedAt: Date;
}
