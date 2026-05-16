import { ActionTokenType } from "@prisma/client";

export const actionTokenConfig: Record<ActionTokenType, { expiresAt: Date }> = {
  FORGOT_PASSWORD: {
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  },
  VERIFY_ACCOUNT: {
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
};
