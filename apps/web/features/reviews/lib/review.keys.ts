import { IReviewQueryDto } from "@repo/shared";

export const reviewKeys = {
  all: ["reviews"] as const,

  product: (productId: number) =>
    [...reviewKeys.all, "product", productId] as const,

  list: (productId: number, query?: IReviewQueryDto) =>
    [...reviewKeys.product(productId), "list", query] as const,
} as const;
