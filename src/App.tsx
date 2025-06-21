
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AccessModeProvider } from "@/contexts/AccessModeContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import HorsesDepartment from "@/pages/dashboard/HorsesDepartment";
import Analytics from "@/pages/dashboard/Analytics";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AccessModeProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                  <AuthGuard>
                    <DashboardLayout />
                  </AuthGuard>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="horses" element={<HorsesDepartment />} />
                  <Route path="horses/breeding" element={<HorsesDepartment />} />
                  <Route path="horses/breeding/mare/:id" element={<HorsesDepartment />} />
                  <Route path="horses/breeding/stallion/:id" element={<HorsesDepartment />} />
                  <Route path="paddocks" element={<div className="p-6"><h1 className="text-2xl font-bold">Paddock Management</h1><p className="text-muted-foreground">Paddock management features coming soon...</p></div>} />
                  <Route path="clients" element={<div className="p-6"><h1 className="text-2xl font-bold">Client Management</h1><p className="text-muted-foreground">Client management features coming soon...</p></div>} />
                  <Route path="laboratory" element={<div className="p-6"><h1 className="text-2xl font-bold">Laboratory</h1><p className="text-muted-foreground">Laboratory management features coming soon...</p></div>} />
                  <Route path="clinic" element={<div className="p-6"><h1 className="text-2xl font-bold">Veterinary Clinic</h1><p className="text-muted-foreground">Clinic management features coming soon...</p></div>} />
                  <Route path="pharmacy" element={<div className="p-6"><h1 className="text-2xl font-bold">Pharmacy</h1><p className="text-muted-foreground">Pharmacy management features coming soon...</p></div>} />
                  <Route path="finance" element={<div className="p-6"><h1 className="text-2xl font-bold">Finance Management</h1><p className="text-muted-foreground">Finance management features coming soon...</p></div>} />
                  <Route path="hr" element={<div className="p-6"><h1 className="text-2xl font-bold">HR Department</h1><p className="text-muted-foreground">HR management features coming soon...</p></div>} />
                  <Route path="inventory" element={<div className="p-6"><h1 className="text-2xl font-bold">Inventory Management</h1><p className="text-muted-foreground">Inventory management features coming soon...</p></div>} />
                  <Route path="marketplace" element={<div className="p-6"><h1 className="text-2xl font-bold">Marketplace</h1><p className="text-muted-foreground">Marketplace features coming soon...</p></div>} />
                  <Route path="movements" element={<div className="p-6"><h1 className="text-2xl font-bold">Horse Movements</h1><p className="text-muted-foreground">Movement tracking features coming soon...</p></div>} />
                  <Route path="training" element={<div className="p-6"><h1 className="text-2xl font-bold">Training Center</h1><p className="text-muted-foreground">Training management features coming soon...</p></div>} />
                  <Route path="academy" element={<div className="p-6"><h1 className="text-2xl font-bold">Riding Academy</h1><p className="text-muted-foreground">Academy reservation features coming soon...</p></div>} />
                  <Route path="rooms" element={<div className="p-6"><h1 className="text-2xl font-bold">Stable Rooms</h1><p className="text-muted-foreground">Room management features coming soon...</p></div>} />
                  <Route path="maintenance" element={<div className="p-6"><h1 className="text-2xl font-bold">Maintenance</h1><p className="text-muted-foreground">Maintenance tracking features coming soon...</p></div>} />
                  <Route path="messages" element={<div className="p-6"><h1 className="text-2xl font-bold">Messages</h1><p className="text-muted-foreground">Messaging features coming soon...</p></div>} />
                  <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Settings management coming soon...</p></div>} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Routes>
            </AuthProvider>
          </AccessModeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
