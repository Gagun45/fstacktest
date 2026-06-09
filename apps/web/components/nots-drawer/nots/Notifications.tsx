import Loader from "@/components/general/Loader";
import { notificationConfig } from "@/constants/notifications";
import { useReadNotification } from "@/features/notifications/hooks/mutations/use-read-not";
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
        const config = notificationConfig[n.type](n);

        return (
          <div
            key={n.id}
            onClick={n.isRead ? undefined : () => onMarkAsRead(n.id)}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            {!n.isRead && (
              <div className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
            )}

            <Link href={config.href}>Go to</Link>

            <div>
              <div
                className={n.isRead ? "text-muted-foreground" : "font-semibold"}
              >
                {config.title}
              </div>

              <div className="text-sm text-muted-foreground">
                {config.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
