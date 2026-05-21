import { ISaleOrder } from "@repo/shared";
import { IPrismaSaleOrder } from "../lib/prisma.args.js";

export const salePresenter = {
  toSaleOrder: (order: IPrismaSaleOrder): ISaleOrder => ({
    createdAt: order.createdAt,
    id: order.id,
    shippingInfo: {
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      shippingAddress1: order.shippingAddress1,
      shippingCity: order.shippingCity,
      shippingCountry: order.shippingCountry,
      customerPhone: order.customerPhone,
      shippingAddress2: order.shippingAddress2,
      shippingNote: order.shippingNote,
      shippingPostalCode: order.shippingPostalCode,
    },
    items: order.items,
  }),
};
