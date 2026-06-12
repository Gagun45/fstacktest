import { notificationConfig } from "@/constants/notifications";
import { INotification } from "@repo/shared";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  notification: INotification;
  onRead: (id: number) => void;
  onNavigate: () => void;
}

const NotificationCard = ({ notification, onRead, onNavigate }: Props) => {
  const config = notificationConfig[notification.type](notification);

  return (
    <Link
      href={config.href}
      onClick={() => {
        if (!notification.isRead) {
          onRead(notification.id);
        }
        onNavigate();
      }}
      className="
        flex items-start gap-3 rounded-lg border p-4
        transition-colors hover:bg-muted/50
        focus:outline-none focus:ring-2 focus:ring-ring
      "
    >
      {!notification.isRead && (
        <div className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />
      )}

      <div className="min-w-0 flex-1">
        <p
          className={
            notification.isRead
              ? "text-sm text-muted-foreground"
              : "text-sm font-medium"
          }
        >
          {config.title}
        </p>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {config.message}
        </p>
      </div>

      <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
};

export default NotificationCard;
