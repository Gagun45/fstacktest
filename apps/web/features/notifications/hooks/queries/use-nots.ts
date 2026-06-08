import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../../notifications.api";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await notificationService.get();
      return data;
    },
  });
};
