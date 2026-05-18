import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { helperMiddleware } from "../lib/helper.middleware.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { userPresenter } from "../presenters/user.presenter.js";
import { ApiError } from "../errors/api.error.js";
import { ISignInDto, ISignUpDto, IUser } from "@repo/shared";

export const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as ISignUpDto;
      const { tokens, user } = await authService.signUp(dto);
      helperMiddleware.setAccessTokenCookie(res, tokens.accessToken);
      helperMiddleware.setRefreshTokenCookie(res, tokens.refreshToken);
      const response: IUser = userPresenter.toPublicUser(user);
      res.status(StatusCodesEnum.CREATED).json(response);
    } catch (e) {
      next(e);
    }
  },
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = req.body as ISignInDto;
      const { user, tokens } = await authService.signIn(dto);
      helperMiddleware.setAccessTokenCookie(res, tokens.accessToken);
      helperMiddleware.setRefreshTokenCookie(res, tokens.refreshToken);
      const response: IUser = userPresenter.toPublicUser(user);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      helperMiddleware.clearCookie(res, "accessToken");
      helperMiddleware.clearCookie(res, "refreshToken");
      const refreshToken = helperMiddleware.getRefreshTokenFromCookie(req);
      if (!refreshToken) {
        throw new ApiError("Unauthorized", StatusCodesEnum.UNAUTHORIZED);
      }
      const { user, tokens } = await authService.refresh(refreshToken);
      helperMiddleware.setAccessTokenCookie(res, tokens.accessToken);
      helperMiddleware.setRefreshTokenCookie(res, tokens.refreshToken);
      const response: IUser = userPresenter.toPublicUser(user);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = helperMiddleware.getRefreshTokenFromCookie(req);
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      helperMiddleware.clearCookie(res, "refreshToken");
      helperMiddleware.clearCookie(res, "accessToken");
      res.status(StatusCodesEnum.OK).json({
        message: "Logged out successfully",
      });
    } catch (e) {
      next(e);
    }
  },
  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.currentUser;
      const response: IUser = userPresenter.toPublicUser(user);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
