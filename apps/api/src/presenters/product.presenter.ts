import { Prisma } from "@prisma/client";
import { IPrismaProductCard } from "../lib/prisma.args.js";
import { IBaseProduct, IProductCard } from "@repo/shared";
import { config } from "../configs/config.js";

export const productPresenter = {
  toProductCard: (product: IPrismaProductCard): IProductCard => {
    return {
      id: product.id,
      images: product.images.map((img) => ({
        id: img.id,
        isMain: img.isMain,
        url: `${config.AWS_S3_ENDPOINT}/${img.url}`,
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
};
