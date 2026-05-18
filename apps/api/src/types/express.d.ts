import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Locals {
      currentUserId: number;
      currentUser: User;
      validatedQuery: any;
    }
  }
}
