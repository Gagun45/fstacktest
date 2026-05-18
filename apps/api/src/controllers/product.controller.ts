import { IDashboardResponse, IProductQueryDto } from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { productService } from "../services/product.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const productController = {
  getDashboardCards: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const query = res.locals.validatedQuery as IProductQueryDto;
      const response: IDashboardResponse = await productService.getCards(query);

      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
