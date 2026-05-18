import { UserRoleEnum } from "../constants/user.roles";

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
