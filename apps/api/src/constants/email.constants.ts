import { EmailTypeEnum } from "../enums/email-types.enum.js";

interface IEmailPayload {
  subject: string;
  template: string;
}

export const emailConstants: Record<EmailTypeEnum, IEmailPayload> = {
  forgotPassword: {
    subject: "Forgot password",
    template: "forgot-password",
  },
  verifyAccount: {
    subject: "Verify account",
    template: "verify-account",
  },
  welcome: {
    subject: "Welcome to the platform",
    template: "welcome",
  },
};
