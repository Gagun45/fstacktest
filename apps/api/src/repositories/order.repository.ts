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
  update: <T extends Prisma.OrderUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrderUpdateArgs>,
    tx?: Prisma.TransactionClient,
  ) => {
    const client = tx ?? prisma;
    return client.order.update(args);
  },
  findMany: <T extends Prisma.OrderFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrderFindManyArgs>,
  ) => prisma.order.findMany(args),
  findUnique: <T extends Prisma.OrderFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.OrderFindUniqueArgs>,
  ) => prisma.order.findUnique(args),
};
