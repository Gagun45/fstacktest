import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationService } from "../../notifications.api";

export const useNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const { data } = await notificationService.get({ page: pageParam });

      return data;
    },

    getNextPageParam: ({ pagination }) => {
      return pagination.hasNext ? pagination.page + 1 : undefined;
    },
  });
};
