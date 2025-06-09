import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Veterinary Pharmacy</h1>
        <p className="text-muted-foreground">Comprehensive pharmacy management and prescription services</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8 lg:grid-cols-16">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Prescriptions</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Suppliers</span>
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="hidden sm:inline">Store & POS</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="dea-tracking" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">DEA Tracking</span>
          </TabsTrigger>
          <TabsTrigger value="drug-checker" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Drug Checker</span>
          </TabsTrigger>
          <TabsTrigger value="dosage-calc" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Dosage Calc</span>
          </TabsTrigger>
          <TabsTrigger value="protocols" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">Protocols</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            <span className="hidden sm:inline">Integration</span>
          </TabsTrigger>
          <TabsTrigger value="clinic-sync" className="flex items-center gap-2">
            <Hospital className="h-4 w-4" />
            <span className="hidden sm:inline">Clinic Sync</span>
          </TabsTrigger>
          <TabsTrigger value="horse-records" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Horse Records</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <PharmacyDashboard />
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-6">
          <PharmacyInventory />
        </TabsContent>
        
        <TabsContent value="prescriptions" className="mt-6">
          <PrescriptionManagement />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <PharmacyTransactions />
        </TabsContent>
        
        <TabsContent value="suppliers" className="mt-6">
          <SupplierManagement />
        </TabsContent>
        
        <TabsContent value="store" className="mt-6">
          <StoreManagement department="pharmacy" departmentName="Pharmacy" />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-6">
          <ComplianceDashboard />
        </TabsContent>
        
        <TabsContent value="dea-tracking" className="mt-6">
          <DEATracking />
        </TabsContent>
        
        <TabsContent value="drug-checker" className="mt-6">
          <DrugInteractionChecker />
        </TabsContent>
        
        <TabsContent value="dosage-calc" className="mt-6">
          <DosageCalculator />
        </TabsContent>
        
        <TabsContent value="protocols" className="mt-6">
          <TreatmentProtocols />
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <AutomatedAlerts />
        </TabsContent>
        
        <TabsContent value="integration" className="mt-6">
          <PharmacyIntegrationDashboard />
        </TabsContent>
        
        <TabsContent value="clinic-sync" className="mt-6">
          <ClinicPharmacyIntegration />
        </TabsContent>
        
        <TabsContent value="horse-records" className="mt-6">
          <HorseRecordsIntegration />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <PharmacyReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyDepartment;
