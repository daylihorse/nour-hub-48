
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PharmacyDashboard from "@/components/pharmacy/PharmacyDashboard";
import PharmacyInventory from "@/components/pharmacy/PharmacyInventory";
import PrescriptionManagement from "@/components/pharmacy/PrescriptionManagement";
import PharmacyTransactions from "@/components/pharmacy/PharmacyTransactions";
import PharmacyReports from "@/components/pharmacy/PharmacyReports";
import SupplierManagement from "@/components/pharmacy/SupplierManagement";
import StoreManagement from "@/components/store/StoreManagement";
import PharmacyIntegrationDashboard from "@/components/pharmacy/integration/PharmacyIntegrationDashboard";
import ClinicPharmacyIntegration from "@/components/pharmacy/integration/ClinicPharmacyIntegration";
import HorseRecordsIntegration from "@/components/pharmacy/integration/HorseRecordsIntegration";
import LaboratoryIntegration from "@/components/pharmacy/integration/LaboratoryIntegration";
import ComplianceDashboard from "@/components/pharmacy/compliance/ComplianceDashboard";
import DEATracking from "@/components/pharmacy/compliance/DEATracking";
import DrugInteractionChecker from "@/components/pharmacy/clinical/DrugInteractionChecker";
import DosageCalculator from "@/components/pharmacy/clinical/DosageCalculator";
import TreatmentProtocols from "@/components/pharmacy/clinical/TreatmentProtocols";
import AutomatedAlerts from "@/components/pharmacy/automation/AutomatedAlerts";
import { 
  BarChart3, 
  Package, 
  FileText, 
  CreditCard, 
  Users, 
  Store,
  Home,
  Network,
  Hospital,
  Zap,
  FlaskRound,
  Shield,
  AlertTriangle,
  Bell,
  Calculator,
  Stethoscope
} from "lucide-react";

const PharmacyDepartment = () => {
  // All tab configurations in a single array for the horizontal navigation
  const tabConfigs = [
    // Core Operations
    { value: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-500" },
    { value: "inventory", label: "Inventory", icon: Package, color: "text-green-500" },
    { value: "prescriptions", label: "Prescriptions", icon: FileText, color: "text-orange-500" },
    { value: "transactions", label: "Transactions", icon: CreditCard, color: "text-purple-500" },
    
    // Clinical Tools
    { value: "drug-checker", label: "Drug Checker", icon: Zap, color: "text-red-500" },
    { value: "dosage-calc", label: "Dosage Calc", icon: Calculator, color: "text-indigo-500" },
    { value: "protocols", label: "Protocols", icon: Stethoscope, color: "text-pink-500" },
    { value: "alerts", label: "Alerts", icon: Bell, color: "text-yellow-500" },
    
    // Management & POS
    { value: "suppliers", label: "Suppliers", icon: Users, color: "text-cyan-500" },
    { value: "store", label: "Store & POS", icon: Store, color: "text-emerald-500" },
    
    // Compliance & Tracking
    { value: "compliance", label: "Compliance", icon: Shield, color: "text-blue-600" },
    { value: "dea-tracking", label: "DEA Tracking", icon: AlertTriangle, color: "text-red-600" },
    
    // Integration & Reports
    { value: "integration", label: "Integration", icon: Network, color: "text-slate-500" },
    { value: "clinic-sync", label: "Clinic Sync", icon: Hospital, color: "text-teal-500" },
    { value: "horse-records", label: "Horse Records", icon: Zap, color: "text-amber-500" },
    { value: "reports", label: "Reports", icon: BarChart3, color: "text-violet-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Veterinary Pharmacy</h1>
        <p className="text-muted-foreground">Comprehensive pharmacy management and prescription services</p>
      </div>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-8 lg:grid-cols-16 h-auto p-1 bg-muted">
          {tabConfigs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-col items-center gap-1 p-2 h-auto text-xs data-[state=active]:bg-background data-[state=active]:text-foreground transition-all duration-200 data-[state=active]:scale-110 data-[state=active]:*:first-child:h-5 data-[state=active]:*:first-child:w-5 data-[state=active]:text-sm"
            >
              <tab.icon className={`h-4 w-4 ${tab.color} transition-all duration-200`} />
              <span className="hidden sm:inline text-center leading-tight transition-all duration-200">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="dashboard" className="mt-0">
            <PharmacyDashboard />
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-0">
            <PharmacyInventory />
          </TabsContent>
          
          <TabsContent value="prescriptions" className="mt-0">
            <PrescriptionManagement />
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-0">
            <PharmacyTransactions />
          </TabsContent>
          
          <TabsContent value="drug-checker" className="mt-0">
            <DrugInteractionChecker />
          </TabsContent>
          
          <TabsContent value="dosage-calc" className="mt-0">
            <DosageCalculator />
          </TabsContent>
          
          <TabsContent value="protocols" className="mt-0">
            <TreatmentProtocols />
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-0">
            <AutomatedAlerts />
          </TabsContent>
          
          <TabsContent value="suppliers" className="mt-0">
            <SupplierManagement />
          </TabsContent>
          
          <TabsContent value="store" className="mt-0">
            <StoreManagement department="pharmacy" departmentName="Pharmacy" />
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-0">
            <ComplianceDashboard />
          </TabsContent>
          
          <TabsContent value="dea-tracking" className="mt-0">
            <DEATracking />
          </TabsContent>
          
          <TabsContent value="integration" className="mt-0">
            <PharmacyIntegrationDashboard />
          </TabsContent>
          
          <TabsContent value="clinic-sync" className="mt-0">
            <ClinicPharmacyIntegration />
          </TabsContent>
          
          <TabsContent value="horse-records" className="mt-0">
            <HorseRecordsIntegration />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <PharmacyReports />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PharmacyDepartment;
