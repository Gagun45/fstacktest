import {
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import SidebarAuthSection from "./auth-section-group/auth-section/SidebarAuthSection";

const SidebarFooterSection = () => {
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

export default SidebarFooterSection;
