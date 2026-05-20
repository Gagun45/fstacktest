import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const orderRepository = {
  create: <T extends Prisma.OrderCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrderCreateArgs>,
    tx?: Prisma.TransactionClient,
  ) => {
    const client = tx ?? prisma;
    return client.order.create(args);
  },
  findMany: <T extends Prisma.OrderFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrderFindManyArgs>,
  ) => prisma.order.findMany(args),
};
