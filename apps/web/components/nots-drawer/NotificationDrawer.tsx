import { useNotifications } from "@/features/notifications/hooks/queries/use-nots";
import { NotificationIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Notifications from "./nots/Notifications";

const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useNotifications();

  const nots = data?.data.data ?? [];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <NotificationIcon className="size-5!" />
          {data?.unreadCount !== undefined && <span>{data.unreadCount}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Manage your notifications</SheetDescription>
        </SheetHeader>
        <Notifications notifications={nots} isLoading={isLoading} />
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDrawer;
