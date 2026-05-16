import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { tokenService } from "../services/token.service.js";
import { TokenTypesEnum } from "../enums/token-types.enum.js";
import { userRepository } from "../repositories/user.repository.js";
import { helperMiddleware } from "../lib/helper.middleware.js";

export const authMiddleware = {
  checkAccessToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = helperMiddleware.getAccessTokenFromCookie(req);
      if (!accessToken)
        throw new ApiError("Token not provided", StatusCodesEnum.UNAUTHORIZED);
      // if (!accessToken) await handleSilentRefresh(req, res, next);

      const tokenPayload = tokenService.verifyToken(
        accessToken,
        TokenTypesEnum.ACCESS,
      );

      const user = await userRepository.findUnique({
        where: {
          id: tokenPayload.id,
        },
      });
      if (!user)
        throw new ApiError("Unauthorized", StatusCodesEnum.UNAUTHORIZED);
      if (user.isBlocked)
        throw new ApiError("User is blocked", StatusCodesEnum.FORBIDDEN);
      res.locals.currentUserId = user.id;
      res.locals.currentUser = user;
      next();
    } catch (e) {
      next(e);
    }
  },
};
