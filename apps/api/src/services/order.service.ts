import { ICheckoutDto } from "@repo/shared";
import { productRepository } from "../repositories/product.repository.js";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { orderRepository } from "../repositories/order.repository.js";
import { handleLowStockAlert } from "../lib/low-stock-alert.helper.js";
import { orderArgs } from "../lib/prisma.args.js";

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
        if (item.quantity > product.stock)
          throw new ApiError(
            `Not enough stock for ${product.title}. Available: ${product.stock}`,
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
      const newOrder = await orderRepository.create(
        {
          data: {
            buyer: { connect: { id: userId } },
            customerEmail: customer.email,
            customerName: customer.name,
            customerPhone: customer.phone,
            total,
            items: { create: orderItemsData },
          },
          ...orderArgs,
        },
        tx,
      );
      for (const item of items) {
        const product = products.find((p) => p.id === item.productId)!;
        const updated = await productRepository.update(
          {
            where: {
              id: item.productId,
            },
            data: {
              stock: { decrement: item.quantity },
            },
          },
          tx,
        );
        if (updated.stock < 0) {
          throw new ApiError(
            `Insufficient stock for ${product.title}`,
            StatusCodesEnum.BAD_REQUEST,
          );
        }

        handleLowStockAlert(
          {
            lowStockThreshold: updated.lowStockThreshold,
            stock: updated.stock,
            title: updated.title,
          },
          product.stock,
        );
      }
      return newOrder;
    });
  },
  getByUserId: (userId: number) =>
    orderRepository.findMany({
      where: { buyerId: userId },
      ...orderArgs,
      orderBy: { createdAt: "desc" },
    }),
};
