import z from "zod";
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

const { bio, email, name, password, phone, username, verificationCode } =
  userFields;
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
