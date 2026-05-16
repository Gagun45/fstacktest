import fs from "node:fs/promises";
import path from "node:path";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { config } from "../configs/config.js";
import { EmailTypeEnum } from "../enums/email-types.enum.js";
import { EmailContextType } from "../types/email-context.types.js";
import { emailConstants } from "../constants/email.constants.js";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});

const renderTemplate = async <T extends EmailTypeEnum>(
  templateName: string,
  context: EmailContextType[T],
) => {
  const layoutSourse = await fs.readFile(
    path.join(process.cwd(), "src", "templates", "base.hbs"),
    "utf-8",
  );
  const layoutTemplate = handlebars.compile(layoutSourse);
  const templateSource = await fs.readFile(
    path.join(process.cwd(), "src", "templates", `${templateName}.hbs`),
    "utf-8",
  );
  const childTemplate = handlebars.compile(templateSource);
  const childHtml = childTemplate(context);
  return layoutTemplate({ body: childHtml });
};

export const emailService = {
  sendEmail: async <T extends EmailTypeEnum>(
    type: T,
    to: string,
    context: EmailContextType[T],
  ): Promise<void> => {
    const { subject, template } = emailConstants[type];
    await transporter.sendMail({
      to: "selyanchyn45@gmail.com",
      subject,
      html: await renderTemplate(template, context),
    });
  },
};
