import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/token.interface.js";
import { config } from "../configs/config.js";
import { tokenRepository } from "../repositories/token.repository.js";
import { TokenTypesEnum } from "../enums/token-types.enum.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";

export const tokenService = {
  generateTokens: async (payload: TokenPayload) => {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_LIFETIME,
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_LIFETIME,
    });

    await tokenRepository.create({
      token: refreshToken,
      userId: payload.id,
    });

    return { accessToken, refreshToken };
  },
  verifyToken: (token: string, type: TokenTypesEnum): TokenPayload => {
    try {
      let secret: string;
      switch (type) {
        case TokenTypesEnum.ACCESS:
          secret = config.JWT_ACCESS_SECRET;
          break;
        case TokenTypesEnum.REFRESH:
          secret = config.JWT_REFRESH_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", StatusCodesEnum.BAD_REQUEST);
      }
      return jwt.verify(token, secret) as TokenPayload;
    } catch {
      throw new ApiError(
        "Token invalid or expired",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }
  },
};
