
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AccessModeProvider } from "@/contexts/AccessModeContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import Layout from "@/components/Layout";
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
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </AuthGuard>
                } />
                <Route path="/dashboard/horses" element={
                  <AuthGuard>
                    <Layout>
                      <HorsesDepartment />
                    </Layout>
                  </AuthGuard>
                } />
                <Route path="/dashboard/horses/breeding" element={
                  <AuthGuard>
                    <Layout>
                      <HorsesDepartment />
                    </Layout>
                  </AuthGuard>
                } />
                <Route path="/dashboard/horses/breeding/mare/:id" element={
                  <AuthGuard>
                    <Layout>
                      <HorsesDepartment />
                    </Layout>
                  </AuthGuard>
                } />
                <Route path="/dashboard/horses/breeding/stallion/:id" element={
                  <AuthGuard>
                    <Layout>
                      <HorsesDepartment />
                    </Layout>
                  </AuthGuard>
                } />
                <Route path="/dashboard/analytics" element={
                  <AuthGuard>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </AuthGuard>
                } />
              </Routes>
            </AuthProvider>
          </AccessModeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
