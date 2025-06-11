
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import TenantProvider from "@/components/tenant/TenantProvider";

const DashboardLayout = () => {
  return (
    <AuthProvider>
      <TenantProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            {/* Sidebar */}
            <DashboardSidebar />
            
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </TenantProvider>
    </AuthProvider>
  );
};

export default DashboardLayout;
