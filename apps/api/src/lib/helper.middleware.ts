import { Request, Response } from "express";

const isProd = process.env.NODE_ENV === "production";

export const helperMiddleware = {
  getAccessTokenFromCookie: (req: Request) => {
    return req.cookies?.accessToken || null;
  },

  getRefreshTokenFromCookie: (req: Request) => {
    return req.cookies?.refreshToken || null;
  },

  setRefreshTokenCookie: (res: Response, refreshToken: string) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },

  setAccessTokenCookie: (res: Response, accessToken: string) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      maxAge: 15 * 60 * 1000,
    });
  },

  clearCookie: (res: Response, key: string) => {
    res.clearCookie(key, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });
  },
};
