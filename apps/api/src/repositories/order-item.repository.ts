import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const orderItemRepository = {
  aggregate: (args: Prisma.OrderItemAggregateArgs) =>
    prisma.orderItem.aggregate(args),
  groupBy: (args: Prisma.OrderItemGroupByArgs) =>
    prisma.orderItem.groupBy(args as any),
};
