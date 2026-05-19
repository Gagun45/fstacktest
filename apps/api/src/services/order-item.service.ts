import { orderItemRepository } from "../repositories/order-item.repository.js";

export const orderItemService = {
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
