import { User } from "@prisma/client";

export type TokenPayload = Pick<User, "id" | "username" | "role">;

export interface RefreshToken {
  token: string;
  userId: number;
}
