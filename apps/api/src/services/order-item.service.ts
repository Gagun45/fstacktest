import { IOrderItemStatus, IOrderItemStatusDto } from "@repo/shared";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { orderItemRepository } from "../repositories/order-item.repository.js";
import { prisma } from "../lib/prisma.js";
import { calculateGlobalOrderStatus } from "../lib/order-status.helper.js";
import { orderRepository } from "../repositories/order.repository.js";

export const orderItemService = {
  updateStatus: async (
    userId: number,
    orderItemId: number,
    dto: IOrderItemStatusDto,
  ) => {
    const existingItem = await orderItemRepository.findUnique({
      where: {
        id: orderItemId,
      },
    });
    if (!existingItem)
      throw new ApiError(
        `Order item ${orderItemId} not found`,
        StatusCodesEnum.NOT_FOUND,
      );
    if (existingItem.sellerId !== userId)
      throw new ApiError(
        "Only own items status update allowed",
        StatusCodesEnum.FORBIDDEN,
      );
    const { status } = dto;
    return await prisma.$transaction(async (tx) => {
      const updatedItem = await orderItemRepository.update({
        where: { id: orderItemId },
        data: { status },
        include: {
          order: {
            include: { items: true },
          },
        },
      });
      const statuses = updatedItem.order.items.map((item) =>
        item.id === updatedItem.id ? updatedItem.status : item.status,
      );
      const newOrderStatus = calculateGlobalOrderStatus(statuses);
      if (newOrderStatus !== updatedItem.order.status)
        await orderRepository.update(
          {
            where: { id: updatedItem.orderId },
            data: { status: newOrderStatus },
          },
          tx,
        );
      return updatedItem;
    });
  },
  getTotalSold: async (productId: number): Promise<number> => {
    const totalSold = await orderItemRepository.aggregate({
      where: { productId },
      _sum: {
        quantity: true,
      },
    });
    return totalSold._sum?.quantity ?? 0;
  },
  getTotalSoldForProducts: async (
    productIds: number[],
  ): Promise<Record<number, number>> => {
    if (productIds.length === 0) return {};

    const results = await orderItemRepository.groupBy({
      where: { productId: { in: productIds } },
      by: ["productId"],
      _sum: { quantity: true },
    });

    const totalSoldMap: Record<number, number> = {};

    for (const item of results) {
      totalSoldMap[item.productId] = item._sum?.quantity ?? 0;
    }

    // Ensure all requested products are present (with 0 if no sales)
    for (const id of productIds) {
      if (!(id in totalSoldMap)) {
        totalSoldMap[id] = 0;
      }
    }

    return totalSoldMap;
  },
};
