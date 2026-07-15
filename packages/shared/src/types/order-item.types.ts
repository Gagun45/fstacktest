export const ORDER_ITEM_STATUSES = [
  "CANCELLED",
  "PROCESSING",
  "DELIVERED",
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

export type ISaleItem = IOrderItem & {};

export interface ISaleOrder {
  id: number;
  createdAt: Date;
  items: IOrderItem[];
  shippingInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string | null;

    shippingCountry: string;
    shippingCity: string;
    shippingAddress1: string;
    shippingAddress2?: string | null;
    shippingPostalCode?: string | null;
    shippingNote?: string | null;
  };
}
