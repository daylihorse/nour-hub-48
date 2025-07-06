
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { Outlet } from "react-router-dom";
import TenantProvider from "@/components/tenant/TenantProvider";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardLayout = () => {
  const { direction } = useLanguage();
  
  return (
    <TenantProvider>
      <SidebarProvider>
        <div className={`min-h-screen flex w-full bg-background ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <DashboardHeader />
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-auto">
              <div className="p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TenantProvider>
  );
};

export default DashboardLayout;
