import { IMyProduct, IProductCard, IProductDetails } from "@repo/shared";
import { config } from "../configs/config.js";
import {
  IPrismaMyProduct,
  IPrismaProductCard,
  IPrismaProductDetails,
} from "../lib/prisma.args.js";

export const productPresenter = {
  toProductCard: (
    product: IPrismaProductCard | IPrismaProductDetails,
  ): IProductCard => {
    return {
      id: product.id,
      images: product.images.map((img) => ({
        id: img.id,
        url: img.url,
        key: img.key,
        order: img.order,
      })),
      description: product.description,
      price: product.price,
      stock: product.stock,
      title: product.title,
      type: product.type,
      seller: {
        id: product.seller.id,
        username: product.seller.username,
      },
      rating: product.reviews.reduce((sum, i) => sum + i.rating, 0),
      totalReviews: product.reviews.length,
    };
  },
  toProductDetails: (product: IPrismaProductDetails): IProductDetails => {
    return {
      ...productPresenter.toProductCard(product),
      keyboard: product.keyboard,
      keycaps: product.keycaps,
      switches: product.switches,
    };
  },
  toMyProduct: (product: IPrismaMyProduct): IMyProduct => {
    return {
      ...productPresenter.toProductDetails(product),
      lowStockThreshold: product.lowStockThreshold,
      totalSold: product.totalSold,
    };
  },
};
