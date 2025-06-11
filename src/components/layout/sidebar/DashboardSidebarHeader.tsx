
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const DashboardSidebarHeader = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className={`flex flex-col p-4 border-b border-sidebar-border gap-3`}>
      {/* Centered content when collapsed, spaced when expanded */}
      <div className={`flex items-center ${
        collapsed ? 'flex-col justify-center gap-2' : 'justify-between'
      }`}>
        {/* Sidebar Toggle */}
        <div className="flex items-center justify-center">
          <SidebarTrigger className="
            h-10 w-10 p-0 
            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground 
            transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            rounded-lg border border-sidebar-border/20
            shadow-sm hover:shadow-md
            [&_svg]:h-5 [&_svg]:w-5
          " />
        </div>

        {/* Notification Bell */}
        <div className="flex items-center justify-center">
          <NotificationDropdown />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarHeader;
