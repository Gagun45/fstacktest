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

  buyerId: number | null;

  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;

  shippingCountry: string;
  shippingCity: string;
  shippingAddress1: string;
  shippingAddress2?: string | null;
  shippingPostalCode?: string | null;
  shippingNote?: string | null;

  total: number;

  status: IOrderStatus;

  createdAt: Date;
  updatedAt: Date;

  items: IOrderItem[];
}

export type IMyOrdersResponse = IOrder[];
