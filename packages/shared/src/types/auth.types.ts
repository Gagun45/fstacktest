import { z } from "zod";
import { zodSchemas } from "../zod/zod.schemas";

export type ISignInDto = z.infer<typeof zodSchemas.auth.signIn>;
export type ISignUpDto = z.infer<typeof zodSchemas.auth.signUp>;
export type IForgotPasswordDto = z.infer<typeof zodSchemas.auth.forgotPassword>;
export type IResetPasswordDto = z.infer<typeof zodSchemas.auth.resetPassword>;
export type IVerifyAccountDto = z.infer<typeof zodSchemas.auth.verifyAccount>;
export type IResendVerificationDto = z.infer<
  typeof zodSchemas.auth.resendVerification
>;
