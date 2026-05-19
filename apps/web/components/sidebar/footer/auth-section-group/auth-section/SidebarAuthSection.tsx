import { useMe } from "@/features/auth/hooks/useMe";
import SidebarUserMenu from "./user-menu/SidebarUserMenu";

const SidebarAuthSection = () => {
  const { data: user } = useMe();
  if (!user) return null;
  return <SidebarUserMenu user={user} />;
};

export default SidebarAuthSection;
