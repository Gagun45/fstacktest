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
