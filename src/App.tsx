import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import HorsesDepartment from "./pages/dashboard/HorsesDepartment";
import LaboratoryDepartment from "./pages/dashboard/LaboratoryDepartment";
import ClinicDepartment from "./pages/dashboard/ClinicDepartment";
import PharmacyDepartment from "./pages/dashboard/PharmacyDepartment";
import FinanceDepartment from "./pages/dashboard/FinanceDepartment";
import HRDepartment from "./pages/dashboard/HRDepartment";
import InventoryManagement from "./pages/dashboard/InventoryManagement";
import HorseMovements from "./pages/dashboard/HorseMovements";
import TrainingCenter from "./pages/dashboard/TrainingCenter";
import StableRooms from "./pages/dashboard/StableRooms";
import MaintenanceDepartment from "./pages/dashboard/MaintainenceDepartment";
import MessagesDepartment from "./pages/dashboard/MessagesDepartment";
import MarketplaceDepartment from "./pages/dashboard/MarketplaceDepartment";
import Paddocks from "./pages/dashboard/Paddocks";

// Client-related imports
import ClientsDepartment from "./pages/dashboard/ClientsDepartment";
import ClientProfile from "./pages/dashboard/ClientProfile";
import ClientForm from "./pages/dashboard/ClientForm";

// Mare detail view import
import MareDetailView from "./components/horses/breeding/mare-detail/MareDetailView";

// Onboarding imports
import PublicMarketplace from "./pages/PublicMarketplace";
import OnboardingEntry from "./pages/onboarding/OnboardingEntry";

// Enhanced auth components
import EnhancedAuthGuard from "./components/auth/EnhancedAuthGuard";
import { EnhancedAuthProvider } from "./components/auth/EnhancedAuthProvider";
import { AccessModeProvider } from "./contexts/AccessModeContext";

// Mare Provider import
import { MareProvider } from "./contexts/MareContext";

// Stallion Provider import  
import { StallionProvider } from "./contexts/StallionContext";

// Stallion detail view import
import StallionDetailView from "./components/horses/breeding/stallion-detail/StallionDetailView";

// Tenant Settings import
import TenantSettings from "./pages/dashboard/TenantSettings";

// POS Page imports
import MarketplacePOSPage from "./pages/pos/MarketplacePOSPage";
import AcademyPOSPage from "./pages/pos/AcademyPOSPage";
import InventoryPOSPage from "./pages/pos/InventoryPOSPage";
import ClinicPOSPage from "./pages/pos/ClinicPOSPage";
import LaboratoryPOSPage from "./pages/pos/LaboratoryPOSPage";
import PharmacyPOSPage from "./pages/pos/PharmacyPOSPage";

// Medical Management import
import MedicalDepartment from "./pages/dashboard/MedicalDepartment";

// Create a new QueryClient instance
const queryClient = new QueryClient();

import UnifiedOperations from "./pages/dashboard/UnifiedOperations";
import TrainingAcademy from "./pages/dashboard/TrainingAcademy";

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AccessModeProvider>
              <EnhancedAuthProvider>
                <MareProvider>
                  <StallionProvider>
                    <Routes>
                      {/* Public marketplace landing page */}
                      <Route path="/" element={<PublicMarketplace />} />
                      
                      {/* Login page */}
                      <Route path="/login" element={<Login />} />
                      
                      {/* Onboarding flow */}
                      <Route path="/onboarding" element={<OnboardingEntry />} />
                      <Route path="/onboarding/:tenantType" element={<OnboardingEntry />} />
                      
                      {/* Standalone POS Pages - No auth required for dedicated POS use */}
                      <Route path="/pos/marketplace" element={<MarketplacePOSPage />} />
                      <Route path="/pos/academy" element={<AcademyPOSPage />} />
                      <Route path="/pos/inventory" element={<InventoryPOSPage />} />
                      <Route path="/pos/clinic" element={<ClinicPOSPage />} />
                      <Route path="/pos/laboratory" element={<LaboratoryPOSPage />} />
                      <Route path="/pos/pharmacy" element={<PharmacyPOSPage />} />
                      
                      {/* Protected dashboard routes - now with enhanced auth guard */}
                      <Route path="/dashboard" element={
                        <EnhancedAuthGuard>
                          <DashboardLayout />
                        </EnhancedAuthGuard>
                      }>
                        <Route index element={<Dashboard />} />
                        <Route path="operations" element={<UnifiedOperations />} />
                        <Route path="horses" element={<HorsesDepartment />} />
                        <Route path="horses/breeding/mares/:mareId" element={<MareDetailView />} />
                        <Route path="horses/breeding/stallions/:stallionId" element={<StallionDetailView />} />
                        <Route path="paddocks" element={<Paddocks />} />
                        <Route path="laboratory" element={<LaboratoryDepartment />} />
                        <Route path="clinic" element={<ClinicDepartment />} />
                        <Route path="pharmacy" element={<PharmacyDepartment />} />
                        <Route path="finance" element={<FinanceDepartment />} />
                        <Route path="hr" element={<HRDepartment />} />
                        <Route path="inventory" element={<InventoryManagement />} />
                        <Route path="marketplace" element={<MarketplaceDepartment />} />
                        <Route path="movements" element={<HorseMovements />} />
                        <Route path="training" element={<TrainingCenter />} />
                        <Route path="academy" element={<TrainingAcademy />} />
                        <Route path="rooms" element={<StableRooms />} />
                        <Route path="maintenance" element={<MaintenanceDepartment />} />
                        <Route path="messages" element={<MessagesDepartment />} />
                        <Route path="messages/:id" element={<MessagesDepartment />} />
                        <Route path="settings" element={<TenantSettings />} />
                        <Route path="medical" element={<MedicalDepartment />} />
                        
                        {/* Client Management Routes */}
                        <Route path="clients" element={<ClientsDepartment />} />
                        <Route path="clients/:id" element={<ClientProfile />} />
                        <Route path="clients/new" element={<ClientForm />} />
                        <Route path="clients/:id/edit" element={<ClientForm />} />
                      </Route>
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </StallionProvider>
                </MareProvider>
              </EnhancedAuthProvider>
            </AccessModeProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
