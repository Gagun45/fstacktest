import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import { INotification, INotificationsResponse } from "@repo/shared";

export const notificationService = {
  get: () => api.get<INotificationsResponse>(backendUrls.notifications.get),
  markAsRead: (notificationId: number) =>
    api.patch<INotification>(
      backendUrls.notifications.maskAsRead(notificationId),
    ),
};
