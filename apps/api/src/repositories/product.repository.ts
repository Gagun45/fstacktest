// src/repositories/product.repository.ts

import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const productRepository = {
  create: <T extends Prisma.ProductCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductCreateArgs>,
  ): Promise<Prisma.ProductGetPayload<T>> => prisma.product.create(args),
  findUnique: <T extends Prisma.ProductFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>,
  ): Promise<Prisma.ProductGetPayload<T> | null> =>
    prisma.product.findUnique(args),
  findManyNew: <T extends Prisma.ProductFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>,
  ): Promise<Prisma.ProductGetPayload<T>[]> => prisma.product.findMany(args),
  count: (args?: Prisma.ProductCountArgs): Promise<number> =>
    prisma.product.count(args),
  update: <T extends Prisma.ProductUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs>,
    tx?: Prisma.TransactionClient,
  ) => {
    const client = tx || prisma;
    return client.product.update(args);
  },
};
