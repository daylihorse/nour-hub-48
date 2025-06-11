
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import SidebarMenu from "./sidebar/SidebarMenu";
import SidebarFooter from "./sidebar/SidebarFooter";
import DashboardSidebarHeader from "./sidebar/DashboardSidebarHeader";
import SidebarAccountSwitcher from "@/components/auth/SidebarAccountSwitcher";

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
        <SidebarHeader>
          <SidebarAccountSwitcher />
          <DashboardSidebarHeader />
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
