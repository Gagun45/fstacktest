import { NotificationType, Prisma } from "@prisma/client";
import { ICheckoutDto } from "@repo/shared";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { prisma } from "../lib/prisma.js";
import { orderRepository } from "../repositories/order.repository.js";
import { productRepository } from "../repositories/product.repository.js";
import { sendLiveNotification } from "../socket.js";
import { notificationService } from "./notification.service.js";
import { orderArgs, saleArgs } from "../lib/prisma.args.js";

export const orderService = {
  create: async (userId: number, dto: ICheckoutDto) => {
    const { customer, items } = dto;
    const productIds = items.map((item) => item.productId);
    return prisma.$transaction(async (tx) => {
      const products = await productRepository.findMany(
        {
          where: { id: { in: productIds } },
        },
        tx,
      );
      const orderItemsData: Prisma.OrderItemCreateWithoutOrderInput[] = [];
      let total = 0;
      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);
        if (!product)
          throw new ApiError(
            `Product ${item.productId} not found`,
            StatusCodesEnum.NOT_FOUND,
          );
        if (!product.isInStock)
          throw new ApiError(
            `Product ${product.title} is not in stock`,
            StatusCodesEnum.BAD_REQUEST,
          );
        orderItemsData.push({
          quantity: item.quantity,
          priceAtTime: product.price,
          title: product.title,
          product: { connect: { id: product.id } },
          seller: { connect: { id: product.sellerId } },
        });
        total += item.quantity * product.price;
      }
      const orderData: Prisma.OrderCreateArgs = {
        data: {
          customerEmail: customer.email,
          customerName: customer.name,
          customerPhone: customer.phone,
          shippingCity: customer.shippingCity,
          shippingAddress1: customer.shippingAddress1,
          shippingCountry: customer.shippingCountry,
          total,
          buyer: { connect: { id: userId } },
          items: { create: orderItemsData },
        },
      };

      if (customer.shippingAddress2) {
        orderData.data.shippingAddress2 = customer.shippingAddress2;
      }

      if (customer.shippingPostalCode) {
        orderData.data.shippingPostalCode = customer.shippingPostalCode;
      }

      if (customer.shippingNote) {
        orderData.data.shippingNote = customer.shippingNote;
      }

      const newOrder = await orderRepository.create(
        {
          ...orderData,
          ...orderArgs,
        },
        tx,
      );
      const sellerIdsSet = new Set(newOrder.items.map((i) => i.sellerId));
      sellerIdsSet.forEach(async (sellerId) => {
        const notification = await notificationService.create(sellerId, {
          type: "NEW_ORDER",
          entityId: newOrder.id,
        });
        sendLiveNotification(sellerId.toString(), notification);
      });
      return newOrder;
    });
  },
  getOrdersByUserId: (userId: number) =>
    orderRepository.findMany({
      where: { buyerId: userId },
      ...orderArgs,
      orderBy: { createdAt: "desc" },
    }),
  getOrderById: async (userId: number, orderId: number) => {
    const order = await orderRepository.findUnique({
      where: { id: orderId },
      ...orderArgs,
    });
    if (!order)
      throw new ApiError("Order not found", StatusCodesEnum.NOT_FOUND);
    if (order.buyerId !== userId)
      throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
    return order;
  },
  getSalesByUserId: (userId: number) =>
    orderRepository.findMany({
      where: {
        items: {
          some: {
            sellerId: userId,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          where: {
            sellerId: userId,
          },
          orderBy: { id: "asc" },
        },
      },
    }),
  getSaleById: async (userId: number, saleId: number) => {
    const sale = await orderRepository.findUnique({
      where: { id: saleId },
      ...saleArgs,
    });
    if (!sale) throw new ApiError("Sale not found", StatusCodesEnum.NOT_FOUND);
    if (sale.buyerId !== userId)
      throw new ApiError("Not allowed", StatusCodesEnum.FORBIDDEN);
    return sale;
  },
};
