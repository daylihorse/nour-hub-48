
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const DashboardSidebarHeader = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className={`flex items-center p-4 border-b border-sidebar-border gap-3 ${
      collapsed ? 'flex-col justify-center' : 'justify-between'
    }`}>
      {/* Sidebar Toggle */}
      <div className="flex items-center justify-center">
        <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" />
      </div>

      {/* Notification Bell */}
      <div className="flex items-center justify-center">
        <NotificationDropdown />
      </div>
    </div>
  );
};

export default DashboardSidebarHeader;
