import {
  ICheckoutDto,
  IMyOrdersResponse,
  IOrder,
  ISaleOrder,
} from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { orderService } from "../services/order.service.js";
import { salePresenter } from "../presenters/sale.presenter.js";

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
  getMyPurchases: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;

      const response: IMyOrdersResponse =
        await orderService.getPurchasesByUserId(userId);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  getMySales: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;

      const sales = await orderService.getSalesByUserId(userId);
      const response: ISaleOrder[] = sales.map(salePresenter.toSaleOrder);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
