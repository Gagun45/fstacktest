import {
  ICreateProductDto,
  IPaginatedResponse,
  IProductCard,
  IProductQueryDto,
  IUpdateProductDto,
} from "@repo/shared";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { createPaginatedResponse } from "../lib/paginated-res-builder.js";
import {
  IPrismaMyProduct,
  IPrismaProductCard,
  IPrismaProductDetails,
  productCardArgs,
  productDetailsArgs,
} from "../lib/prisma.args.js";
import {
  buildCreateProduct,
  buildUpdateProduct,
} from "../lib/product-builder.js";
import { productQueryBuilder } from "../lib/product.query.builder.js";
import { productPresenter } from "../presenters/product.presenter.js";
import { productRepository } from "../repositories/product.repository.js";
import { orderItemService } from "./order-item.service.js";
import { imageRepository } from "../repositories/image.repository.js";
import { favoriteRepository } from "../repositories/favorite.repository.js";

export const productService = {
  getCards: async (
    query: IProductQueryDto,
  ): Promise<IPaginatedResponse<IProductCard>> => {
    const args = productQueryBuilder(query);
    const [items, totalItems] = await Promise.all([
      productRepository.findMany({
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
      ...productDetailsArgs,
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
  getMyById: async (
    sellerId: number,
    productId: number,
  ): Promise<IPrismaMyProduct> => {
    const [product, totalSold] = await Promise.all([
      productRepository.findUnique({
        where: {
          id: productId,
          sellerId,
        },
        ...productDetailsArgs,
      }),

      orderItemService.getTotalSold(productId),
    ]);

    if (!product) {
      throw new ApiError(
        "Product not found or you do not own it",
        StatusCodesEnum.NOT_FOUND,
      );
    }

    return {
      ...product,
      totalSold,
    };
  },
  getMy: async (
    sellerId: number,
    query: IProductQueryDto,
  ): Promise<IPaginatedResponse<IPrismaMyProduct>> => {
    const args = productQueryBuilder(query);
    args.where = { ...args.where, sellerId };
    const [items, totalItems] = await Promise.all([
      productRepository.findMany({ ...args, ...productDetailsArgs }),
      productRepository.count({ where: args.where }),
    ]);
    const productIds = items.map((item) => item.id);
    const totalSoldMap =
      await orderItemService.getTotalSoldForProducts(productIds);

    // Attach totalSold to each product
    const myProducts: IPrismaMyProduct[] = items.map((item) => ({
      ...item,
      totalSold: totalSoldMap[item.id] ?? 0,
    }));
    return createPaginatedResponse(
      myProducts,
      totalItems,
      query.page,
      query.limit,
    );
  },
  update: async (
    userId: number,
    productId: number,
    dto: IUpdateProductDto,
  ): Promise<IPrismaProductDetails> => {
    const { removeImageIds, addImages, ...rest } = dto;

    const product = await productRepository.findUnique({
      where: { id: productId },
    });

    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);

    if (product.sellerId !== userId)
      throw new ApiError("Forbidden", StatusCodesEnum.FORBIDDEN);

    if (product.type !== dto.type)
      throw new ApiError(
        "Cannot change product type",
        StatusCodesEnum.BAD_REQUEST,
      );
    const currentImageCount = await imageRepository.count({
      where: { productId },
    });
    const removeCount = removeImageIds?.length ?? 0;
    const addCount = addImages?.length ?? 0;
    const finalCount = currentImageCount - removeCount + addCount;
    if (finalCount > 10) {
      throw new ApiError(
        "Maximum 10 images allowed",
        StatusCodesEnum.BAD_REQUEST,
      );
    }
    await Promise.all([
      removeImageIds?.length
        ? imageRepository.deleteMany({
            where: {
              id: { in: removeImageIds.map(Number) },
              productId,
            },
          })
        : null,
      addImages?.length
        ? imageRepository.createMany({
            data: addImages.map((img) => ({
              productId,
              key: img.key,
              url: img.url,
            })),
          })
        : null,
    ]);
    const updateData = buildUpdateProduct(rest);
    const updatedProduct = await productRepository.update({
      where: { id: productId },
      data: updateData,
      ...productDetailsArgs,
    });

    return updatedProduct;
  },
  getFavoriteIds: async (userId: number) => {
    const entities = await favoriteRepository.findMany({
      where: { userId },
      select: { productId: true },
    });
    const ids: number[] = entities.map((ent) => ent.productId);
    return ids;
  },
  getFavorites: async (userId: number): Promise<IPrismaProductCard[]> => {
    console.log(userId);
    const favorites = await productRepository.findMany({
      where: {
        favorites: {
          some: { userId },
        },
      },
      ...productCardArgs,
    });
    return favorites;
  },
  addToFavorites: async (userId: number, productId: number) => {
    const product = await productRepository.findUnique({
      where: { id: productId },
      include: { favorites: true },
    });
    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);
    if (product.favorites.some((f) => f.userId === userId)) return;
    await favoriteRepository.create({
      data: { productId, userId },
    });
  },
  removeFromFavorites: async (userId: number, productId: number) => {
    const product = await productRepository.findUnique({
      where: { id: productId },
      include: { favorites: true },
    });
    if (!product)
      throw new ApiError("Product not found", StatusCodesEnum.NOT_FOUND);
    if (!product.favorites.some((f) => f.userId === userId)) return;
    await favoriteRepository.delete({
      where: {
        userId_productId: {
          productId,
          userId,
        },
      },
    });
  },
};
