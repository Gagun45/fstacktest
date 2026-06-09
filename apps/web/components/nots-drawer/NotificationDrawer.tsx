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
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useNotifications();

  const nots = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = data?.pages[0].unreadCount;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <NotificationIcon className="size-5!" />
          {unreadCount !== undefined && <span>{unreadCount}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Manage your notifications</SheetDescription>
        </SheetHeader>
        <Notifications notifications={nots} isLoading={isFetchingNextPage} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            Load more
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDrawer;
