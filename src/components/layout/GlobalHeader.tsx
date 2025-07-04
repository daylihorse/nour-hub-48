
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const GlobalHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-brown">
      <div className="flex h-14 items-center px-4">
        {/* Global Sidebar Toggle - Always Visible */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:shadow-brown" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">
              Dayli Horse Management System
            </h1>
          </div>
        </div>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <NotificationDropdown />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
