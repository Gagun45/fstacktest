export type INotificationDto = {
  title: string;
  message: string;
};

export type INotification = {
  id: number;
  message: string;
  title: string;
  type: INotificationType;
  createdAt: Date;
  isRead: boolean;
};

export const NotificationType = {
  BASIC: "BASIC",
  NEW_ORDER: "NEW_ORDER",
  NEW_REVIEW: "NEW_REVIEW",
} as const;

export type INotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
