import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const reviewRepository = {
  findMany: <T extends Prisma.ReviewFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReviewFindManyArgs>,
  ): Promise<Prisma.ReviewGetPayload<T>[]> => prisma.review.findMany(args),
  count: <T extends Prisma.ReviewFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReviewFindManyArgs>,
  ): Promise<number> => prisma.review.count({ where: args.where }),
  create: <T extends Prisma.ReviewCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReviewCreateArgs>,
  ): Promise<Prisma.ReviewGetPayload<T>> => prisma.review.create(args),
  findUnique: <T extends Prisma.ReviewFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReviewFindUniqueArgs>,
  ): Promise<Prisma.ReviewGetPayload<T> | null> =>
    prisma.review.findUnique(args),
};
