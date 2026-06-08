import Loader from "@/components/general/Loader";
import { useReadNotification } from "@/features/notifications/hooks/mutations/use-read-not";
import { backendUrls } from "@/lib/backend.urls";
import { frontendUrls } from "@/lib/frontendUrls";
import { INotification } from "@repo/shared";
import Link from "next/link";

interface Props {
  notifications: INotification[];
  isLoading: boolean;
}

const Notifications = ({ notifications, isLoading }: Props) => {
  const { mutate } = useReadNotification();
  const onMarkAsRead = (notificationId: number) => {
    mutate({
      notificationId,
    });
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((n) => {
        const link =
          n.type === "NEW_ORDER"
            ? frontendUrls.sales.my
            : frontendUrls.products.details(n.entityId ?? 0);
        return (
          <div
            key={n.id}
            onClick={n.isRead ? undefined : () => onMarkAsRead(n.id)}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            {!n.isRead && (
              <div className="mt-1 size-2 rounded-full bg-blue-500 shrink-0" />
            )}
            <Link href={link}>Go to</Link>

            <div>
              <div
                className={n.isRead ? "text-muted-foreground" : "font-semibold"}
              >
                {n.title} #${n.entityId}
              </div>
              <div className="text-sm text-muted-foreground">{n.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
