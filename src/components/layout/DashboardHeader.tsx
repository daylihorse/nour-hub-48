
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import TenantSwitcher from "@/components/auth/TenantSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

const DashboardHeader = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* Left side with sidebar trigger */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">
              EquiSense Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Tenant Switcher */}
        <div className="flex-1 flex justify-center max-w-xs mx-4">
          <TenantSwitcher />
        </div>

        {/* Right side - User menu */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user?.firstName} {user?.lastName}
          </span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
