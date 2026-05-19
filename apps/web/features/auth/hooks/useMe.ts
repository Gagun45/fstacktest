import { useQuery } from "@tanstack/react-query";
import { authService } from "../auth.api";

export const useMe = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await authService.me();
      return res.data;
    },
  });
  return query;
};
