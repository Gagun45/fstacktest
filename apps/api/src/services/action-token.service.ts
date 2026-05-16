import crypto from "crypto";

export const actionTokenService = {
  generate: (): string => crypto.randomBytes(32).toString("hex"),
};
