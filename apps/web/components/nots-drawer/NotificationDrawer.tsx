import { useNotifications } from "@/features/notifications/hooks/queries/use-nots";
import { NotificationIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
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

import { useInView } from "react-intersection-observer";
import Loader from "../general/Loader";

const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useNotifications();

  const nots = data?.pages.flatMap((page) => page.data) ?? [];
  const unreadCount = data?.pages[0].unreadCount;

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <div className="flex flex-col gap-4 px-2">
          <Notifications
            onNavigate={() => setIsOpen(false)}
            notifications={nots}
            isLoading={isLoading}
          />

          {hasNextPage && <div ref={ref} className="h-1" />}

          {isFetchingNextPage && <Loader />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationDrawer;
