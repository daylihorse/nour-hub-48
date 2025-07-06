
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SampleManagement from "@/components/laboratory/SampleManagement";
import TestResults from "@/components/laboratory/TestResults";
import EquipmentManagement from "@/components/laboratory/EquipmentManagement";
import LaboratoryDocumentManager from "@/components/laboratory/LaboratoryDocumentManager";
import ResultComparison from "@/components/laboratory/ResultComparison";
import QualityControl from "@/components/laboratory/QualityControl";
import TemplateManagement from "@/components/laboratory/TemplateManagement";
import LaboratoryModuleAccessCenter from "@/components/laboratory/LaboratoryModuleAccessCenter";
import StoreManagement from "@/components/store/StoreManagement";
import POSChoiceDialog from "@/components/pos/POSChoiceDialog";
import { usePOSChoice } from "@/hooks/usePOSChoice";
import POSSystem from "@/components/pos/POSSystem";
import { Store, TestTube, Microscope, FileText, Settings, TrendingUp, Shield, File, ShoppingCart, Layers } from "lucide-react";

const LaboratoryDepartment = () => {
  const [activeTab, setActiveTab] = useState("samples");
  const [showPOS, setShowPOS] = useState(false);
  
  const {
    isDialogOpen,
    openPOSChoice,
    closePOSChoice,
    handleUseHere,
    handleOpenSeparate,
  } = usePOSChoice("Laboratory");

  const handlePOSTabClick = () => {
    openPOSChoice();
  };

  const handleUsePOSHere = () => {
    handleUseHere(() => {
      setActiveTab("pos");
      setShowPOS(true);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Comprehensive laboratory testing and analysis management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-max grid-cols-10 min-w-full">
            <TabsTrigger value="samples" className="flex items-center gap-2 whitespace-nowrap">
              <TestTube className="h-4 w-4" />
              Samples & Tests
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2 whitespace-nowrap">
              <Microscope className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2 whitespace-nowrap">
              <TrendingUp className="h-4 w-4" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="quality" className="flex items-center gap-2 whitespace-nowrap">
              <Shield className="h-4 w-4" />
              Quality Control
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2 whitespace-nowrap">
              <File className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2 whitespace-nowrap">
              <Settings className="h-4 w-4" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 whitespace-nowrap">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2 whitespace-nowrap">
              <Layers className="h-4 w-4" />
              Modules
            </TabsTrigger>
            <TabsTrigger 
              value="pos" 
              className="flex items-center gap-2 whitespace-nowrap"
              onClick={handlePOSTabClick}
            >
              <ShoppingCart className="h-4 w-4" />
              Point of Sale
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2 whitespace-nowrap">
              <Store className="h-4 w-4" />
              Store
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="samples" className="mt-6">
          <SampleManagement />
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <TestResults />
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <ResultComparison />
        </TabsContent>
        
        <TabsContent value="quality" className="mt-6">
          <QualityControl />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <TemplateManagement />
        </TabsContent>
        
        <TabsContent value="equipment" className="mt-6">
          <EquipmentManagement />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <LaboratoryDocumentManager />
        </TabsContent>

        <TabsContent value="modules" className="mt-6">
          <LaboratoryModuleAccessCenter />
        </TabsContent>

        {showPOS && (
          <TabsContent value="pos" className="mt-6">
            <POSSystem department="laboratory" />
          </TabsContent>
        )}

        <TabsContent value="store" className="mt-6">
          <StoreManagement department="laboratory" departmentName="Laboratory" />
        </TabsContent>
      </Tabs>

      <POSChoiceDialog
        isOpen={isDialogOpen}
        onClose={closePOSChoice}
        departmentName="Laboratory"
        onUseHere={handleUsePOSHere}
        onOpenSeparate={handleOpenSeparate}
      />
    </div>
  );
};

export default LaboratoryDepartment;
