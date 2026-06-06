import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewKeys } from "../../lib/review.keys";
import { reviewService } from "../../reviews.api";

export const useGetReviews = (productId: number) => {
  return useInfiniteQuery({
    queryKey: reviewKeys.list(productId),

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const { data } = await reviewService.getByProductId(productId, {
        page: pageParam,
      });

      return data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.page + 1
        : undefined;
    },
  });
};
