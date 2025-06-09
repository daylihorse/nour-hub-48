
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import HorsesDepartment from "./pages/dashboard/HorsesDepartment";
import LaboratoryDepartment from "./pages/dashboard/LaboratoryDepartment";
import ClinicDepartment from "./pages/dashboard/ClinicDepartment";
import FinanceDepartment from "./pages/dashboard/FinanceDepartment";
import HRDepartment from "./pages/dashboard/HRDepartment";
import InventoryManagement from "./pages/dashboard/InventoryManagement";
import HorseMovements from "./pages/dashboard/HorseMovements";
import TrainingCenter from "./pages/dashboard/TrainingCenter";
import StableRooms from "./pages/dashboard/StableRooms";
import MaintenanceDepartment from "./pages/dashboard/MaintainenceDepartment";
import MessagesDepartment from "./pages/dashboard/MessagesDepartment";
import MarketplaceDepartment from "./pages/dashboard/MarketplaceDepartment";

// New client-related imports
import ClientsDepartment from "./pages/dashboard/ClientsDepartment";
import ClientProfile from "./pages/dashboard/ClientProfile";
import ClientForm from "./pages/dashboard/ClientForm";

// Mare detail view import
import MareDetailView from "./components/horses/breeding/mare-detail/MareDetailView";

// Create a new QueryClient instance
const queryClient = new QueryClient();

import UnifiedOperations from "./pages/dashboard/UnifiedOperations";

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="operations" element={<UnifiedOperations />} />
                <Route path="horses" element={<HorsesDepartment />} />
                <Route path="horses/breeding/mares/:mareId" element={<MareDetailView />} />
                <Route path="laboratory" element={<LaboratoryDepartment />} />
                <Route path="clinic" element={<ClinicDepartment />} />
                <Route path="finance" element={<FinanceDepartment />} />
                <Route path="hr" element={<HRDepartment />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="marketplace" element={<MarketplaceDepartment />} />
                <Route path="movements" element={<HorseMovements />} />
                <Route path="training" element={<TrainingCenter />} />
                <Route path="rooms" element={<StableRooms />} />
                <Route path="maintenance" element={<MaintenanceDepartment />} />
                <Route path="messages" element={<MessagesDepartment />} />
                
                {/* Client Management Routes */}
                <Route path="clients" element={<ClientsDepartment />} />
                <Route path="clients/:id" element={<ClientProfile />} />
                <Route path="clients/new" element={<ClientForm />} />
                <Route path="clients/:id/edit" element={<ClientForm />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
