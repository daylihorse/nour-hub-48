
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const DashboardSidebarHeader = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <div className="flex flex-col items-center p-4 border-b border-sidebar-border gap-3">
      {/* Top - Sidebar Toggle */}
      <div className="flex items-center justify-center w-full">
        <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" />
      </div>

      {/* Bottom - Notification Bell */}
      <div className="flex items-center justify-center w-full">
        <NotificationDropdown />
      </div>

      {/* Title - Only shown when expanded */}
      {!collapsed && (
        <div className="w-full text-center">
          <h1 className="text-lg font-semibold text-sidebar-foreground truncate">
            Stable Management System
          </h1>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebarHeader;
