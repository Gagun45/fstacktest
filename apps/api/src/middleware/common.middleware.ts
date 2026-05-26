import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const commonMiddleware = {
  isBodyValid: (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await schema.parseAsync(req.body || {});
        next();
      } catch (err: any) {
        if (err instanceof ZodError) {
          const errors = err.issues.map((issue) => ({
            field: issue.path.join(".") || "unknown",
            message: issue.message,
          }));

          const message = errors
            .map((err) => `${err.field}: ${err.message}`)
            .join(", ");

          return next(new ApiError(message, StatusCodesEnum.BAD_REQUEST));
        }

        next(err);
      }
    };
  },
  isQueryValid: (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = { ...req.query };
        if (query.types) {
          query.types = Array.isArray(query.types)
            ? query.types
            : [query.types];
        }
        const validatedQuery = await schema.parseAsync(query);
        res.locals.validatedQuery = validatedQuery;
        next();
      } catch (e: any) {
        const message = e.issues?.[0].message || "Invalid query parameters";
        next(new ApiError(message, StatusCodesEnum.BAD_REQUEST));
      }
    };
  },
};
