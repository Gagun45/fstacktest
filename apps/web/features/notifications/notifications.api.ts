import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  INotification,
  INotificationQueryDto,
  INotificationsResponse,
} from "@repo/shared";

export const notificationService = {
  get: (params: INotificationQueryDto) =>
    api.get<INotificationsResponse>(backendUrls.notifications.get, { params }),
  markAsRead: (notificationId: number) =>
    api.patch<INotification>(
      backendUrls.notifications.maskAsRead(notificationId),
    ),
};
