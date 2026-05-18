import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import { IUser } from "@repo/shared";

export const userService = {
  me: () => api.get<IUser>(backendUrls.auth.me),
  //   uploadAvatar: (formData: FormData) => {
  //     return api.patch<UserResponse>(backendUrls..me.avatar, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   },
  //   updateProfile: (data: IUserUpdateDto) =>
  //     api.patch<IUserResponse>(backendUrls.users.me.profile, data),
};
