export const EventStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type IEventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export enum FileTypeEnum {
  AVATAR = "avatar",
  EVENT_POSTER = "poster",
}
