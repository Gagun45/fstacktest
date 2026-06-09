import {
  INotificationDto,
  INotificationQueryDto,
  IPaginatedResponse,
} from "@repo/shared";
import { StatusCodesEnum } from "../enums/status-codes.enum.js";
import { ApiError } from "../errors/api.error.js";
import { notificationRepository } from "../repositories/notification.repository.js";
import { notificationQueryBuilder } from "../lib/notification.query.builder.js";
import { createPaginatedResponse } from "../lib/paginated-res-builder.js";

export const notificationService = {
  create: async (userId: number, dto: INotificationDto) => {
    const { type, entityId } = dto;
    const notification = await notificationRepository.create({
      data: {
        type,
        userId,
        entityId,
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
  get: async (userId: number, query: INotificationQueryDto) => {
    const args = notificationQueryBuilder(query);
    const [notifications, totalCount, unreadCount] = await Promise.all([
      notificationRepository.findMany({
        ...args,
        where: {
          userId,
        },
      }),
      notificationRepository.count({
        where: {
          userId,
        },
      }),
      notificationRepository.count({
        where: {
          userId,
          isRead: false,
        },
      }),
    ]);
    const paginatedResponse = createPaginatedResponse(
      notifications,
      totalCount,
      query.page,
      5,
    );
    return { data: paginatedResponse, unreadCount };
  },
};
