import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const notificationRepository = {
  create: (args: Prisma.NotificationCreateArgs) =>
    prisma.notification.create(args),
  findMany: (args: Prisma.NotificationFindManyArgs) =>
    prisma.notification.findMany(args),
  count: (args: Prisma.NotificationCountArgs) =>
    prisma.notification.count(args),
  findUnique: (args: Prisma.NotificationFindUniqueArgs) =>
    prisma.notification.findUnique(args),
  update: (args: Prisma.NotificationUpdateArgs) =>
    prisma.notification.update(args),
};
