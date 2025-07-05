
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import EnhancedAuthProvider from "./components/auth/EnhancedAuthProvider";
import EnhancedAuthGuard from "./components/auth/EnhancedAuthGuard";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import HorsesDepartment from "./pages/dashboard/HorsesDepartment";
import ClientManagement from "./pages/dashboard/ClientManagement";
import ClientProfile from "./pages/dashboard/ClientProfile";
import InventoryDepartment from "./pages/dashboard/InventoryDepartment";
import HRDepartment from "./pages/dashboard/HRDepartment";
import FinanceDepartment from "./pages/dashboard/FinanceDepartment";
import ClinicDepartment from "./pages/dashboard/ClinicDepartment";
import LaboratoryDepartment from "./pages/dashboard/LaboratoryDepartment";
import Login from "./pages/Login";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <EnhancedAuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/*"
                  element={
                    <EnhancedAuthGuard>
                      <MainLayout>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/horses/*" element={<HorsesDepartment />} />
                          <Route path="/clients" element={<ClientManagement />} />
                          <Route path="/clients/:clientId" element={<ClientProfile />} />
                          <Route path="/inventory" element={<InventoryDepartment />} />
                          <Route path="/hr" element={<HRDepartment />} />
                          <Route path="/finance" element={<FinanceDepartment />} />
                          <Route path="/clinic" element={<ClinicDepartment />} />
                          <Route path="/laboratory" element={<LaboratoryDepartment />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </MainLayout>
                    </EnhancedAuthGuard>
                  }
                />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </Router>
        </EnhancedAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
