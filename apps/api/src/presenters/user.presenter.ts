import { User } from "@prisma/client";
import { IUser, UserRoleEnum } from "@repo/shared";
import { config } from "../configs/config.js";

export const userPresenter = {
  toPublicUser: (user: User): IUser => {
    return {
      id: user.id,
      email: user.email,
      isBlocked: user.isBlocked,
      isVerified: user.isVerified,
      name: user.name,
      username: user.username,
      avatar: user.avatar ? `${config.AWS_S3_ENDPOINT}/${user.avatar}` : "",
      bio: user.bio ?? "",
      country: user.country ?? "",
      phone: user.phone ?? "",
      role: user.role as UserRoleEnum,
    };
  },
};
