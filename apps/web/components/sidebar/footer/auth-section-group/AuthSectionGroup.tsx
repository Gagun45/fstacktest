import {
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import React from "react";
import SidebarAuthSection from "./auth-section/SidebarAuthSection";

const SidebarAuthSectionGroup = () => {
  return (
    <SidebarFooter>
      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          <SidebarAuthSection />
        </SidebarMenu>
      </SidebarGroup>
    </SidebarFooter>
  );
};

export default SidebarAuthSectionGroup;
