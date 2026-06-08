import { NotificationType } from "@prisma/client";
import { INotificationDto } from "@repo/shared";
import { notificationRepository } from "../repositories/notification.repository.js";
import { ApiError } from "../errors/api.error.js";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";

export const notificationService = {
  create: async (
    userId: number,
    type: NotificationType,
    dto: INotificationDto,
  ) => {
    const { message, title } = dto;
    const notification = await notificationRepository.create({
      data: {
        message,
        title,
        type,
        userId,
      },
    });
    return notification;
  },
  maskAsRead: async (userId: number, notificationId: number) => {
    const notification = await notificationRepository.findUnique({
      where: { id: notificationId },
    });
    if (!notification)
      throw new ApiError("Notification not found", StatusCodesEnum.NOT_FOUND);
    if (notification.userId !== userId)
      throw new ApiError("Not your notification", StatusCodesEnum.FORBIDDEN);
    const updatedNotification = await notificationRepository.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
    return updatedNotification;
  },
  get: async (userId: number) => {
    const [notifications, unreadCount] = await Promise.all([
      notificationRepository.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      notificationRepository.count({
        where: {
          userId,
          isRead: false,
        },
      }),
    ]);
    return { notifications, unreadCount };
  },
};
