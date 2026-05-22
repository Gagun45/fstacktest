import { IOrderItem, IOrderItemStatusDto } from "@repo/shared";
import { NextFunction, Request, Response } from "express";
import { orderItemService } from "../services/order-item.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const orderItemController = {
  updateStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const orderItemId = Number(req.params["orderItemId"]);
      const dto = req.body as IOrderItemStatusDto;
      const response: IOrderItem = await orderItemService.updateStatus(
        userId,
        orderItemId,
        dto,
      );
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
