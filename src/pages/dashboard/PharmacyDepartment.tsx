
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Package, ShoppingCart, FileText, Users, BarChart3, Shield } from "lucide-react";
import PharmacyDashboard from "@/components/pharmacy/PharmacyDashboard";
import PharmacyInventory from "@/components/pharmacy/PharmacyInventory";
import PrescriptionManagement from "@/components/pharmacy/PrescriptionManagement";
import PharmacyPOSSystem from "@/components/pharmacy/pos/PharmacyPOSSystem";
import PharmacyReports from "@/components/pharmacy/PharmacyReports";
import PharmacyTransactions from "@/components/pharmacy/PharmacyTransactions";
import SupplierManagement from "@/components/pharmacy/SupplierManagement";
import POSChoiceDialog from "@/components/pos/POSChoiceDialog";
import { usePOSChoice } from "@/hooks/usePOSChoice";

const PharmacyDepartment = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPOS, setShowPOS] = useState(false);
  
  const {
    isDialogOpen,
    openPOSChoice,
    closePOSChoice,
    handleUseHere,
    handleOpenSeparate,
  } = usePOSChoice("Pharmacy");

  // Handle URL parameters on component mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'pos') {
      setActiveTab('pos');
      setShowPOS(true);
    }
  }, [searchParams]);

  const handlePOSTabClick = () => {
    openPOSChoice();
  };

  const handleUsePOSHere = () => {
    handleUseHere(() => {
      setActiveTab("pos");
      setShowPOS(true);
    });
  };

  const handleOpenPOSSeparate = () => {
    handleOpenSeparate("/dashboard/pharmacy?tab=pos");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pharmacy Management</h1>
        <p className="text-muted-foreground">
          Complete pharmacy operations including prescription management, inventory, and sales
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
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
          <TabsTrigger 
            value="pos" 
            className="flex items-center gap-2"
            onClick={activeTab !== "pos" ? handlePOSTabClick : undefined}
          >
            <ShoppingCart className="h-4 w-4" />
            POS System
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
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
        
        {showPOS && (
          <TabsContent value="pos" className="mt-6">
            <PharmacyPOSSystem />
          </TabsContent>
        )}
        
        <TabsContent value="transactions" className="mt-6">
          <PharmacyTransactions />
        </TabsContent>
        
        <TabsContent value="suppliers" className="mt-6">
          <SupplierManagement />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <PharmacyReports />
        </TabsContent>
      </Tabs>

      <POSChoiceDialog
        isOpen={isDialogOpen}
        onClose={closePOSChoice}
        departmentName="Pharmacy"
        onUseHere={handleUsePOSHere}
        onOpenSeparate={handleOpenPOSSeparate}
      />
    </div>
  );
};

export default PharmacyDepartment;
