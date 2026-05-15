import { IOrderItem } from "./order-item.types";

export const ORDER_STATUSES = [
  "PENDING",
  "CANCELLED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
] as const;

export type IOrderStatus = (typeof ORDER_STATUSES)[number];

export interface IOrder {
  id: number;
  buyerId: number;
  total: number;
  status: IOrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: IOrderItem[];
}

export type IMyOrdersResponse = IOrder[];
