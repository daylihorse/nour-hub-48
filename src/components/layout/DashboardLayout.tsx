
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import GlobalHeader from "./GlobalHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Global Header - Fixed at top */}
        <GlobalHeader />
        
        {/* Main Layout Container */}
        <div className="flex flex-1 pt-14">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
