
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
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const { direction } = useLanguage();
  const collapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar 
        className={`${collapsed ? "w-16" : "w-64"} ${direction === 'rtl' ? 'border-l border-r-0' : 'border-r border-l-0'}`} 
        collapsible="icon"
        side={direction === 'rtl' ? 'right' : 'left'}
      >
        <SidebarHeader>
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
