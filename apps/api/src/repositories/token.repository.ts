import { RefreshToken } from "../interfaces/token.interface.js";
import { prisma } from "../lib/prisma.js";

export const tokenRepository = {
  create: (data: RefreshToken) => prisma.token.create({ data }),

  findOne: (token: string) =>
    prisma.token.findUnique({
      where: { token },
    }),

  deleteOne: (token: string) =>
    prisma.token.delete({
      where: { token },
    }),
};
