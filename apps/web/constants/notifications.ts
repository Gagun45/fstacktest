import { frontendUrls } from "@/lib/frontendUrls";
import { INotification } from "@repo/shared";

export const notificationConfig = {
  NEW_ORDER: (n: INotification) => ({
    title: "New order received",
    message: `Order #${n.entityId} requires your attention.`,
    href: frontendUrls.sales.my,
  }),

  NEW_REVIEW: (n: INotification) => ({
    title: "New review",
    message: `Your product received a new review.`,
    href: frontendUrls.products.details(n.entityId ?? 0),
  }),

  BASIC: (n: INotification) => ({
    title: "Notification",
    message: "You have a new notification.",
    href: "#",
  }),
} as const;
