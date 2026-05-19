import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  IForgotPasswordDto,
  IResetPasswordDto,
  ISignInDto,
  ISignUpDto,
  IUser,
  IVerifyAccountDto,
} from "@repo/shared";

export const authService = {
  signIn: (data: ISignInDto) => api.post<IUser>(backendUrls.auth.signIn, data),
  signUp: (data: ISignUpDto) => api.post<IUser>(backendUrls.auth.signUp, data),
  logout: () => api.post(backendUrls.auth.logout),
  forgotPassword: (data: IForgotPasswordDto) =>
    api.post(backendUrls.auth.forgotPassword, data),
  resetPassword: (data: IResetPasswordDto) =>
    api.post(backendUrls.auth.resetPassword, data),
  verifyAccount: (data: IVerifyAccountDto) =>
    api.post(backendUrls.auth.verifyAccount, data),
  me: () => api.get<IUser>(backendUrls.auth.me),
};
