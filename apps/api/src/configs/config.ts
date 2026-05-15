import { ObjectCannedACL } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

const environment = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${environment}`),
});

interface IConfig {
  PORT: string;
  DATABASE_URL: string;

  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_LIFETIME: any;

  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_LIFETIME: any;

  JWT_FORGOT_PASSWORD_SECRET: string;
  JWT_FORGOT_PASSWORD_LIFETIME: any;

  JWT_VERIFY_ACCOUNT_SECRET: string;
  JWT_VERIFY_ACCOUNT_LIFETIME: any;

  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_S3_REGION: string;
  AWS_S3_ACL: ObjectCannedACL;
  AWS_S3_ENDPOINT: string;

  SMTP_USER: string;
  SMTP_PASSWORD: string;

  FRONTEND_URL: string;
}

export const config: IConfig = {
  PORT: process.env.PORT!,
  DATABASE_URL: process.env.DATABASE_URL!,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME,

  JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_FORGOT_PASSWORD_LIFETIME: process.env.JWT_FORGOT_PASSWORD_LIFETIME,

  JWT_VERIFY_ACCOUNT_SECRET: process.env.JWT_VERIFY_ACCOUNT_SECRET!,
  JWT_VERIFY_ACCOUNT_LIFETIME: process.env.JWT_VERIFY_ACCOUNT_LIFETIME,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY!,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY!,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME!,
  AWS_S3_REGION: process.env.AWS_S3_REGION!,
  AWS_S3_ACL: process.env.AWS_S3_ACL as ObjectCannedACL,
  AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT!,

  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD!,

  FRONTEND_URL: process.env.FRONTEND_URL!,
};
