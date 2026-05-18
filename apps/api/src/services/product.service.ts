import {
  IPaginatedResponse,
  IProductCard,
  IProductQueryDto,
} from "@repo/shared";
import { productQueryBuilder } from "../lib/product.query.builder.js";
import { productRepository } from "../repositories/product.repository.js";
import { productCardArgs } from "../lib/prisma.args.js";
import { productPresenter } from "../presenters/product.presenter.js";
import { createPaginatedResponse } from "../lib/paginated-res-builder.js";

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
};
