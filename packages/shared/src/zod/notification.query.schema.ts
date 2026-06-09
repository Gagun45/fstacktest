import z from "zod";
import { zodCommonFields } from "./common.fields";

const {
  query: { page },
} = zodCommonFields;

export const notificationQuerySchema = z.object({
  page,
});

export type INotificationQueryDto = z.infer<typeof notificationQuerySchema>;
