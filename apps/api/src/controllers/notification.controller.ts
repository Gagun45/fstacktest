import { NextFunction, Request, Response } from "express";
import { notificationService } from "../services/notification.service.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { INotification, INotificationsResponse } from "@repo/shared";
import { notificationPresenter } from "../presenters/notification.presenter.js";
import { Notification } from "@prisma/client";

export const notificationController = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.currentUserId;

      const { notifications, unreadCount } =
        await notificationService.get(userId);
      const response: INotificationsResponse = {
        notifications: notifications.map(notificationPresenter.toPublic),
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
