import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const favoriteRepository = {
  findMany: <T extends Prisma.FavoriteFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FavoriteFindManyArgs>,
  ) => prisma.favorite.findMany(args),
  create: (args: Prisma.FavoriteCreateArgs) => prisma.favorite.create(args),
  delete: (args: Prisma.FavoriteDeleteArgs) => prisma.favorite.delete(args),
};
