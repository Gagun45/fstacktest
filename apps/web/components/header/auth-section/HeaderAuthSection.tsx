"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import HeaderGuestActions from "./guest-actions/HeaderGuestActions";
import HeaderUserMenu from "./user-menu/HeaderUserMenu";

const HeaderAuthSection = () => {
  const { data: user, isLoading } = useMe();
  if (isLoading) return null;
  if (!user) return <HeaderGuestActions />;
  return <HeaderUserMenu user={user} />;
};

export default HeaderAuthSection;
