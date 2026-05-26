import { Prisma } from "@prisma/client";
import { IProductQueryDto } from "@repo/shared";

const LIMIT = 10;

export const productQueryBuilder = (
  query: IProductQueryDto,
): Pick<Prisma.ProductFindManyArgs, "skip" | "take" | "where" | "orderBy"> => {
  const { page, sortBy, order } = query;

  const skip = (page - 1) * LIMIT;
  const where: Prisma.ProductWhereInput = {};

  // if (search) {
  //   where.OR = [
  //     { title: { contains: search, mode: "insensitive" } },
  //     { description: { contains: search, mode: "insensitive" } },
  //   ];
  // }

  // Handle Price Range
  if (query.minPrice || query.maxPrice) {
    where.price = {
      ...(query.minPrice && { gte: query.minPrice }),
      ...(query.maxPrice && { lte: query.maxPrice }),
    };
  }

  return {
    skip,
    take: LIMIT,
    where,
    orderBy: [
      {
        [sortBy]: order,
        // Dynamic key mapping
      },
      {
        createdAt: "asc",
      },
    ],
  };
};
