"use client";

import { useMe } from "@/features/auth/hooks/useMe";
import CartDrawer from "../cart-drawer/CartDrawer";
import NotificationDrawer from "../nots-drawer/NotificationDrawer";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import HeaderAuthSection from "./auth-section/HeaderAuthSection";

const Header = () => {
  const { data: me } = useMe();
  return (
    <header
      className="h-24 sticky top-0 border-b z-20 px-4 w-full bg-sidebar flex items-center gap-4
  "
    >
      {/* <NotificationProvider /> */}
      <SidebarTrigger className="dark:text-foreground" />
      <ThemeToggle />
      <div className="flex items-center ml-auto gap-4">
        <HeaderAuthSection />
      </div>
      <CartDrawer />
      {me && <NotificationDrawer />}
    </header>
  );
};

export default Header;
