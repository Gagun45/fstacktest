import {
  ICreateProductDto,
  IPaginatedResponse,
  IProductCard,
  IProductQueryDto,
} from "@repo/shared";
import { productQueryBuilder } from "../lib/product.query.builder.js";
import { productRepository } from "../repositories/product.repository.js";
import {
  IPrismaProductDetails,
  productCardArgs,
  productDetailsArgs,
} from "../lib/prisma.args.js";
import { productPresenter } from "../presenters/product.presenter.js";
import { createPaginatedResponse } from "../lib/paginated-res-builder.js";
import { buildCreateProduct } from "../lib/product-builder.js";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const productService = {
  getCards: async (
    query: IProductQueryDto,
  ): Promise<IPaginatedResponse<IProductCard>> => {
    const args = productQueryBuilder(query);
    const [items, totalItems] = await Promise.all([
      productRepository.findManyNew({
        ...args,
        ...productCardArgs,
      }),
      productRepository.count({ where: args.where }),
    ]);
    const itemsWithRating: IProductCard[] = items.map(
      productPresenter.toProductCard,
    );
    return createPaginatedResponse(
      itemsWithRating,
      totalItems,
      query.page,
      query.limit,
    );
  },
  create: async (sellerId: number, dto: ICreateProductDto) => {
    const data = buildCreateProduct(dto, sellerId);
    const newCard = await productRepository.create({
      data,
      ...productCardArgs,
    });
    return newCard;
  },
  getDetails: async (productId: number): Promise<IPrismaProductDetails> => {
    const product = await productRepository.findUnique({
      where: { id: productId },
      ...productDetailsArgs,
    });
    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);
    return product;
  },
};
