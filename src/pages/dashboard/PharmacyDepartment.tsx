
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PharmacyDashboard from "@/components/pharmacy/PharmacyDashboard";
import PharmacyInventory from "@/components/pharmacy/PharmacyInventory";
import PrescriptionManagement from "@/components/pharmacy/PrescriptionManagement";
import PharmacyTransactions from "@/components/pharmacy/PharmacyTransactions";
import PharmacyReports from "@/components/pharmacy/PharmacyReports";
import SupplierManagement from "@/components/pharmacy/SupplierManagement";
import StoreManagement from "@/components/store/StoreManagement";
import { 
  BarChart3, 
  Package, 
  FileText, 
  CreditCard, 
  Users, 
  Store,
  Home
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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store & POS
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
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
        
        <TabsContent value="reports" className="mt-6">
          <PharmacyReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyDepartment;
