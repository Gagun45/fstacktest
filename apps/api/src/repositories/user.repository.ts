import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const userRepository = {
  create: <T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ): Promise<Prisma.UserGetPayload<T>> => prisma.user.create(args),

  findFirst: <T extends Prisma.UserFindFirstArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
  ): Promise<Prisma.UserGetPayload<T> | null> => prisma.user.findFirst(args),

  findUnique: <T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ): Promise<Prisma.UserGetPayload<T> | null> => prisma.user.findUnique(args),

  update: <T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
  ): Promise<Prisma.UserGetPayload<T>> => prisma.user.update(args),
};
