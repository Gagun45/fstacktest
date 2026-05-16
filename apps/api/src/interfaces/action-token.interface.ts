import { ActionTokenType } from "@prisma/client";

export interface ActionTokenDto {
  token: string;
  type: ActionTokenType;
  userId: number;
  expiresAt: Date;
}
