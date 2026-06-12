import { Prisma } from "@prisma/client";

export const productCardArgs = {
  include: {
    seller: true,
    images: true,
    reviews: {
      select: {
        rating: true,
      },
    },
  },
} satisfies Omit<Prisma.ProductFindUniqueArgs, "where">;

export type IPrismaProductCard = Prisma.ProductGetPayload<
  typeof productCardArgs
>;

export const productDetailsArgs = {
  include: {
    ...productCardArgs.include,
    keyboard: true,
    keycaps: true,
    switches: true,
  },
} satisfies Omit<Prisma.ProductFindUniqueArgs, "where">;

export type IPrismaProductDetails = Prisma.ProductGetPayload<
  typeof productDetailsArgs
>;

export type IPrismaMyProduct = Prisma.ProductGetPayload<
  typeof productDetailsArgs
> & { totalSold: number };

export const orderArgs = {
  include: {
    items: true,
  },
} satisfies Omit<Prisma.OrderFindManyArgs, "where">;

export const saleArgs = {
  include: {
    items: true,
  },
} satisfies Omit<Prisma.OrderFindManyArgs, "where">;

export type IPrismaSaleOrder = Prisma.OrderGetPayload<typeof saleArgs>;

export const reviewArgs = {
  include: {
    reviewer: true,
  },
} satisfies Omit<Prisma.ReviewFindManyArgs, "where">;
export type IPrismaReview = Prisma.ReviewGetPayload<typeof reviewArgs>;
