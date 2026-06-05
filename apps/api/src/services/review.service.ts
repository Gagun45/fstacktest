import { Prisma } from "@prisma/client";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { productRepository } from "../repositories/product.repository.js";
import { reviewRepository } from "../repositories/review.repository.js";
import { IPrismaReview, reviewArgs } from "../lib/prisma.args.js";
import {
  ICreateReviewDto,
  IPaginatedResponse,
  IReviewQueryDto,
} from "@repo/shared";
import { createPaginatedResponse } from "../lib/paginated-res-builder.js";
import { reviewQueryBuilder } from "../lib/review.query.builder.js";

export const reviewService = {
  getByProductId: async (
    productId: number,
    query: IReviewQueryDto,
  ): Promise<IPaginatedResponse<IPrismaReview>> => {
    const product = await productRepository.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);
    const args = reviewQueryBuilder(query);

    const [reviews, total] = await Promise.all([
      reviewRepository.findMany({
        where: { productId },
        ...reviewArgs,
        ...args,
      }),
      reviewRepository.count({ where: { productId } }),
    ]);
    const { page } = query;
    const data = createPaginatedResponse(reviews, total, page, 10);
    return data;
  },
  create: async (userId: number, productId: number, dto: ICreateReviewDto) => {
    const product = await productRepository.findUnique({
      where: { id: productId },
    });
    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);

    const existingReview = await reviewRepository.findUnique({
      where: {
        reviewerId_productId: {
          productId,
          reviewerId: userId,
        },
      },
    });
    if (existingReview)
      throw new ApiError(
        "You can have only one review per product",
        StatusCodesEnum.CONFLICT,
      );

    const newReview = await reviewRepository.create({
      data: {
        ...dto,
        productId,
        reviewerId: userId,
        sellerId: product.sellerId,
      },
      ...reviewArgs,
    });
    return newReview;
  },
};
