import { NextFunction, Request, Response } from "express";
import { notificationService } from "../services/notification.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import {
  INotification,
  INotificationQueryDto,
  INotificationsResponse,
  IPaginatedResponse,
} from "@repo/shared";
import { notificationPresenter } from "../presenters/notification.presenter.js";
import { Notification } from "@prisma/client";

export const notificationController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const query = res.locals.validatedQuery as INotificationQueryDto;

      const { data, unreadCount } = await notificationService.get(
        userId,
        query,
      );
      const paginatedData: IPaginatedResponse<INotification> = {
        pagination: data.pagination,
        data: data.data.map(notificationPresenter.toPublic),
      };
      const response: INotificationsResponse = {
        ...paginatedData,
        unreadCount,
      };
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
  markAsRead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;
      const notificationId = Number(req.params["notificationId"]);

      const updatedNotification = await notificationService.maskAsRead(
        userId,
        notificationId,
      );
      const response: INotification =
        notificationPresenter.toPublic(updatedNotification);
      res.status(StatusCodesEnum.OK).json(response);
    } catch (e) {
      next(e);
    }
  },
};
