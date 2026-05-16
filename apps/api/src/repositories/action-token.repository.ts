import { ActionToken, Prisma } from "@prisma/client";
import { ActionTokenDto } from "../interfaces/action-token.interface.js";
import { prisma } from "../lib/prisma.js";

export const actionTokenRepository = {
  create: (data: ActionTokenDto): Promise<ActionToken> =>
    prisma.actionToken.create({ data }),
  deleteMany: (where: Prisma.ActionTokenWhereInput) =>
    prisma.actionToken.deleteMany({ where }),
  findFirstByParams: (where: Prisma.ActionTokenWhereInput) =>
    prisma.actionToken.findFirst({ where }),
};
