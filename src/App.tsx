
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Horses from "@/pages/dashboard/Horses";
import Clinic from "@/pages/dashboard/Clinic";
import Finance from "@/pages/dashboard/Finance";
import Inventory from "@/pages/dashboard/Inventory";
import Clients from "@/pages/dashboard/Clients";
import TrainingCenter from "@/pages/dashboard/TrainingCenter";
import Analytics from "@/pages/dashboard/Analytics";
import ClientProfile from "@/pages/dashboard/ClientProfile";
import HorseBreeding from "@/pages/dashboard/HorseBreeding";
import MareDetail from "@/pages/dashboard/MareDetail";
import StallionDetail from "@/pages/dashboard/StallionDetail";
import TrainingAcademy from "@/pages/dashboard/TrainingAcademy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
                    <Horses />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/horses/breeding" element={
                <AuthGuard>
                  <Layout>
                    <HorseBreeding />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/horses/breeding/mare/:id" element={
                <AuthGuard>
                  <Layout>
                    <MareDetail />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/horses/breeding/stallion/:id" element={
                <AuthGuard>
                  <Layout>
                    <StallionDetail />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/clinic" element={
                <AuthGuard>
                  <Layout>
                    <Clinic />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/finance" element={
                <AuthGuard>
                  <Layout>
                    <Finance />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/inventory" element={
                <AuthGuard>
                  <Layout>
                    <Inventory />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/clients" element={
                <AuthGuard>
                  <Layout>
                    <Clients />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/clients/:id" element={
                <AuthGuard>
                  <Layout>
                    <ClientProfile />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/training" element={
                <AuthGuard>
                  <Layout>
                    <TrainingCenter />
                  </Layout>
                </AuthGuard>
              } />
              <Route path="/dashboard/training-academy" element={
                <AuthGuard>
                  <Layout>
                    <TrainingAcademy />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
