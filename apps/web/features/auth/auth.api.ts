import { api } from "@/axios/axios";
import { backendUrls } from "@/lib/backend.urls";
import {
  ForgotPasswordDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  User,
  UserResponse,
  VerifyAccountDto,
} from "@repo/shared";

export const authService = {
  signIn: (data: SignInDto) => api.post<User>(backendUrls.auth.signIn, data),
  signUp: (data: SignUpDto) =>
    api.post<UserResponse>(backendUrls.auth.signUp, data),
  logout: () => api.post(backendUrls.auth.logout),
  forgotPassword: (data: ForgotPasswordDto) =>
    api.post(backendUrls.auth.forgotPassword, data),
  resetPassword: (data: ResetPasswordDto) =>
    api.post(backendUrls.auth.resetPassword, data),
  verifyAccount: (data: VerifyAccountDto) =>
    api.post(backendUrls.auth.verifyAccount, data),
};
