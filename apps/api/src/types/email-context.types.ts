import { EmailTypeEnum } from "../enums/email-types.enum.js";

export type EmailContextType = {
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    resetLink: string;
    name: string;
  };
  [EmailTypeEnum.VERIFY_ACCOUNT]: {
    verificationLink: string;
    name: string;
  };
  [EmailTypeEnum.WELCOME]: {
    verificationLink: string;
    name: string;
  };
};
