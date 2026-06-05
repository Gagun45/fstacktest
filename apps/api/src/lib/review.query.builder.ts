import { Prisma } from "@prisma/client";
import { IProductQueryDto, IReviewQueryDto } from "@repo/shared";

const LIMIT = 10;

export const reviewQueryBuilder = (
  query: IReviewQueryDto,
): Pick<Prisma.ReviewFindManyArgs, "skip" | "take" | "orderBy"> => {
  const { page } = query;

  const skip = (page - 1) * LIMIT;

  return {
    skip,
    take: LIMIT,
    orderBy: {
      createdAt: "asc",
    },
  };
};
