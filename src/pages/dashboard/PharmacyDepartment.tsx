
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
  const [activeTab, setActiveTab] = useState("dashboard");

  // Grouped tab configurations for better organization
  const tabGroups = [
    {
      title: "Core Operations",
      tabs: [
        { value: "dashboard", label: "Dashboard", icon: Home, color: "text-blue-500" },
        { value: "inventory", label: "Inventory", icon: Package, color: "text-green-500" },
        { value: "prescriptions", label: "Prescriptions", icon: FileText, color: "text-orange-500" },
        { value: "transactions", label: "Transactions", icon: CreditCard, color: "text-purple-500" },
      ]
    },
    {
      title: "Clinical Tools",
      tabs: [
        { value: "drug-checker", label: "Drug Checker", icon: Zap, color: "text-red-500" },
        { value: "dosage-calc", label: "Dosage Calc", icon: Calculator, color: "text-indigo-500" },
        { value: "protocols", label: "Protocols", icon: Stethoscope, color: "text-pink-500" },
        { value: "alerts", label: "Alerts", icon: Bell, color: "text-yellow-500" },
      ]
    },
    {
      title: "Management & POS",
      tabs: [
        { value: "suppliers", label: "Suppliers", icon: Users, color: "text-cyan-500" },
        { value: "store", label: "Store & POS", icon: Store, color: "text-emerald-500" },
      ]
    },
    {
      title: "Compliance & Tracking",
      tabs: [
        { value: "compliance", label: "Compliance", icon: Shield, color: "text-blue-600" },
        { value: "dea-tracking", label: "DEA Tracking", icon: AlertTriangle, color: "text-red-600" },
      ]
    },
    {
      title: "Integration & Reports",
      tabs: [
        { value: "integration", label: "Integration", icon: Network, color: "text-slate-500" },
        { value: "clinic-sync", label: "Clinic Sync", icon: Hospital, color: "text-teal-500" },
        { value: "horse-records", label: "Horse Records", icon: Zap, color: "text-amber-500" },
        { value: "reports", label: "Reports", icon: BarChart3, color: "text-violet-500" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Veterinary Pharmacy</h1>
        <p className="text-muted-foreground">Comprehensive pharmacy management and prescription services</p>
      </div>
      
      {/* Tab Groups Layout */}
      <div className="space-y-4">
        {tabGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {group.tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeTab === tab.value 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <tab.icon className={`h-4 w-4 ${activeTab === tab.value ? 'text-primary-foreground' : tab.color}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "dashboard" && <PharmacyDashboard />}
        {activeTab === "inventory" && <PharmacyInventory />}
        {activeTab === "prescriptions" && <PrescriptionManagement />}
        {activeTab === "transactions" && <PharmacyTransactions />}
        {activeTab === "suppliers" && <SupplierManagement />}
        {activeTab === "store" && <StoreManagement department="pharmacy" departmentName="Pharmacy" />}
        {activeTab === "compliance" && <ComplianceDashboard />}
        {activeTab === "dea-tracking" && <DEATracking />}
        {activeTab === "drug-checker" && <DrugInteractionChecker />}
        {activeTab === "dosage-calc" && <DosageCalculator />}
        {activeTab === "protocols" && <TreatmentProtocols />}
        {activeTab === "alerts" && <AutomatedAlerts />}
        {activeTab === "integration" && <PharmacyIntegrationDashboard />}
        {activeTab === "clinic-sync" && <ClinicPharmacyIntegration />}
        {activeTab === "horse-records" && <HorseRecordsIntegration />}
        {activeTab === "reports" && <PharmacyReports />}
      </div>
    </div>
  );
};

export default PharmacyDepartment;
