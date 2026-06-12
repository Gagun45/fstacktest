import Loader from "@/components/general/Loader";
import { useReadNotification } from "@/features/notifications/hooks/mutations/use-read-not";
import { INotification } from "@repo/shared";
import NotificationCard from "./card/NotificationCard";

interface Props {
  notifications: INotification[];
  isLoading: boolean;
  onNavigate: () => void;
}

const Notifications = ({ notifications, isLoading, onNavigate }: Props) => {
  const { mutate } = useReadNotification();

  const handleRead = (notificationId: number) => {
    mutate({ notificationId });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRead={handleRead}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
};

export default Notifications;
