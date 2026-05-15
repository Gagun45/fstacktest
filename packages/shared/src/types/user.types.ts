import { z } from "zod";
import { zodSchemas } from "../zod/zod.schemas";
import { UserRoleEnum } from "../constants/user.roles";

export type IUserUpdateDto = z.infer<typeof zodSchemas.user.updateProfile>;
export type IUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  isBlocked: boolean;
  isVerified: boolean;
  avatar: string;
  bio: string;
  country: string;
  phone: string;
  role: UserRoleEnum;
};

export interface IUserResponse {
  user: IUser;
}
