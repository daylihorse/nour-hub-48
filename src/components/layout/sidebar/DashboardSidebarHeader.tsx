
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const DashboardSidebarHeader = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
      {/* Left side - Sidebar Toggle and Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" />
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-sidebar-foreground truncate">
              Stable Management System
            </h1>
          </div>
        )}
      </div>

      {/* Right side - Notifications */}
      <div className="flex items-center">
        <NotificationDropdown />
      </div>
    </div>
  );
};

export default DashboardSidebarHeader;
