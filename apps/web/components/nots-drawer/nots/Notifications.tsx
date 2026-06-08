import Loader from "@/components/general/Loader";
import { useReadNotification } from "@/features/notifications/hooks/mutations/use-read-not";
import { INotification } from "@repo/shared";

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
      {notifications.map((n) => (
        <div
          key={n.id}
          onClick={n.isRead ? undefined : () => onMarkAsRead(n.id)}
          className="flex items-start gap-3 rounded-lg border p-3"
        >
          {!n.isRead && (
            <div className="mt-1 size-2 rounded-full bg-blue-500 shrink-0" />
          )}

          <div>
            <div
              className={n.isRead ? "text-muted-foreground" : "font-semibold"}
            >
              {n.title}
            </div>
            <div className="text-sm text-muted-foreground">{n.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
