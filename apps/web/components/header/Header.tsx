"use client";

import ThemeToggle from "../theme-toggle/ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import HeaderAuthSection from "./auth-section/HeaderAuthSection";

const Header = () => {
  return (
    <header
      className="h-24 px-4 w-full bg-sidebar flex items-center gap-4
  "
    >
      {/* <NotificationProvider /> */}
      <SidebarTrigger className="dark:text-foreground" />
      <ThemeToggle />
      <div className="flex items-center ml-auto gap-4">
        <HeaderAuthSection />
      </div>
      {/* <CartDrawer /> */}
    </header>
  );
};

export default Header;
