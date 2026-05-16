"use client";

import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { USER_LINKS } from "@/constants/links";
import SidebarFooterSection from "./footer/SidebarFooterSection";
import SidebarLink from "./link/SidebarLink";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-24 p-0 flex items-center justify-center">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex justify-center">
              <SidebarLink
                href={"/"}
                label="Evently"
                className="text-4xl! tracking-widest"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarGroup>
        <SidebarMenu>
          {USER_LINKS.map(({ href, label }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild>
                <SidebarLink href={href} label={label} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* <SidebarGroup>
        <SidebarMenu>
          {PUBLIC_LINKS.map(({ href, label }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild>
                <SidebarLink href={href} label={label} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup> */}

      {/* <SidebarContent>
        {data?.user.role &&
          roleHelper.isMinimumRole(data.user.role, UserRoleEnum.ADMIN) && (
            <SidebarAdminLinks />
          )}
      </SidebarContent> */}
      <SidebarFooterSection />
    </Sidebar>
  );
}
