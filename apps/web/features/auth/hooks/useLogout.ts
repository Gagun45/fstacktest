import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.api";
import { frontendUrls } from "@/constants/frontend.urls";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.clear();
      router.push(frontendUrls.home);
      router.refresh();
    },
  });
  return mutation;
};
