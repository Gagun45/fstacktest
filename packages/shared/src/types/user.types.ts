import { UserRoleEnum } from "../constants/user.roles";

export type User = {
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

export interface UserResponse {
  user: User;
}
