import { Prisma } from "@prisma/client";
import { INotificationQueryDto } from "@repo/shared";

const LIMIT = 5;

export const notificationQueryBuilder = (
  query: INotificationQueryDto,
): Pick<Prisma.NotificationFindManyArgs, "skip" | "take" | "orderBy"> => {
  const { page } = query;

  const skip = (page - 1) * LIMIT;

  return {
    skip,
    take: LIMIT,

    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };
};
