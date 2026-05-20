import { ICheckoutDto, IMyOrdersResponse, IOrder } from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { orderService } from "../services/order.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const orderController = {
  checkout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const checkout = req.body as ICheckoutDto;

      const userId = res.locals.currentUserId;

      const response: IOrder = await orderService.create(userId, checkout);
      res.status(StatusCodesEnum.CREATED).json(response);
    } catch (e) {
      next(e);
    }
  },
  getMy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;

      const response: IMyOrdersResponse =
        await orderService.getByUserId(userId);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
