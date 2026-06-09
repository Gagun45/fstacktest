export type INotificationDto = {
  type: INotificationType;
  entityId?: number;
};

export type INotification = {
  id: number;
  entityId: number | null;
  type: INotificationType;
  createdAt: Date;
  isRead: boolean;
};

export const NotificationType = {
  NEW_ORDER: "NEW_ORDER",
  NEW_REVIEW: "NEW_REVIEW",
} as const;

export type INotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
