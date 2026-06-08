// components/SocketHandler.tsx
"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import { orderKeys } from "@/features/orders/order.keys";
import { productKeys } from "@/features/products/lib/product.keys";
import { reviewKeys } from "@/features/reviews/lib/review.keys";
import { socket } from "@/lib/socket";
import { INotification } from "@repo/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SocketHandler() {
  // 1. Get the user data directly inside the component
  const { data, isSuccess } = useMe();
  const qclient = useQueryClient();
  const userId = data?.id;

  useEffect(() => {
    // 2. Only run the logic if we aren't loading and we actually have a user
    if (!isSuccess || !userId) return;

    // 3. Setup Connection
    socket.connect();
    socket.emit("register_user", userId.toString());

    // 4. Setup Listeners
    socket.on("new_notification", (notification: INotification) => {
      const { message, title, type } = notification;
      qclient.invalidateQueries({ queryKey: ["notifications"] });
      toast.info(title, {
        description: message,
      });
      switch (type) {
        case "NEW_ORDER": {
          qclient.invalidateQueries({ queryKey: orderKeys.sales });
        }
        case "NEW_REVIEW": {
          qclient.invalidateQueries({
            queryKey: productKeys.all,
          });
        }
        default: {
        }
      }
    });

    // 5. Cleanup
    return () => {
      socket.off("new_notification");
      socket.disconnect();
    };
  }, [userId, isSuccess, qclient]); // Re-run when user ID is found or loading status changes

  return null; // This component is a "ghost"—it has no UI, only logic
}
