import { Notification } from "@prisma/client";
import { INotification } from "@repo/shared";

export const notificationPresenter = {
  toPublic: (notification: Notification): INotification => {
    return {
      createdAt: notification.createdAt,
      id: notification.id,
      isRead: notification.isRead,
      type: notification.type,
      entityId: notification.entityId,
    };
  },
};
