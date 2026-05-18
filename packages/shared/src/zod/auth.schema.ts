import { z } from "zod";
import { Regex } from "../constants/regex";
import { userFields } from "./user.schema";

export const authFields = {
  token: z
    .string()
    .regex(
      Regex.TOKEN,
      "Token must be a valid 64-character hexadecimal string",
    ),
};

const { email, name, password, username } = userFields;
const { token } = authFields;

export const authSchemas = {
  resetPassword: z.object({
    password,
    token,
  }),
  forgotPassword: z.object({
    email,
  }),
  verifyAccount: z.object({
    token,
  }),
  resendVerification: z.object({
    email,
  }),
  signIn: z.object({
    email,
    password,
  }),
  signUp: z.object({
    email,
    password,
    name,
    username,
  }),
};

export type ISignInDto = z.infer<typeof authSchemas.signIn>;
export type ISignUpDto = z.infer<typeof authSchemas.signUp>;
export type IForgotPasswordDto = z.infer<typeof authSchemas.forgotPassword>;
export type IResetPasswordDto = z.infer<typeof authSchemas.resetPassword>;
export type IVerifyAccountDto = z.infer<typeof authSchemas.verifyAccount>;
export type IResendVerificationDto = z.infer<
  typeof authSchemas.resendVerification
>;
