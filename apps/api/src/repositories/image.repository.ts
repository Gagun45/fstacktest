import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const imageRepository = {
  deleteMany: (args: Prisma.ImageDeleteManyArgs) =>
    prisma.image.deleteMany(args),
  createMany: (args: Prisma.ImageCreateManyArgs) =>
    prisma.image.createMany(args),
  count: (args: Prisma.ImageCountArgs) => prisma.image.count(args),
};
