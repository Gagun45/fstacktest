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

export type SignInDto = z.infer<typeof authSchemas.signIn>;
export type SignUpDto = z.infer<typeof authSchemas.signUp>;
export type ForgotPasswordDto = z.infer<typeof authSchemas.forgotPassword>;
export type ResetPasswordDto = z.infer<typeof authSchemas.resetPassword>;
export type VerifyAccountDto = z.infer<typeof authSchemas.verifyAccount>;
export type ResendVerificationDto = z.infer<
  typeof authSchemas.resendVerification
>;
