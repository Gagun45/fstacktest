import { useQuery } from "@tanstack/react-query";
import { userService } from "../user.api";

export const useMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await userService.me();
      return res.data;
    },
  });
  return query;
};
