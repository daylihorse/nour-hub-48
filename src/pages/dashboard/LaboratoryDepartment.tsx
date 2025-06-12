
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaboratoryOverview from "@/components/laboratory/LaboratoryOverview";
import SampleManagement from "@/components/laboratory/SampleManagement";
import TestResults from "@/components/laboratory/TestResults";
import EquipmentManagement from "@/components/laboratory/EquipmentManagement";
import LaboratoryDocumentManager from "@/components/laboratory/LaboratoryDocumentManager";
import StoreManagement from "@/components/store/StoreManagement";
import { Store, FlaskRound, TestTube, Microscope, FileText, Settings } from "lucide-react";

const LaboratoryDepartment = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Comprehensive laboratory testing and analysis management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FlaskRound className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="samples" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Samples & Tests
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            Results
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Store
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <LaboratoryOverview />
        </TabsContent>
        
        <TabsContent value="samples" className="mt-6">
          <SampleManagement />
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <TestResults />
        </TabsContent>
        
        <TabsContent value="equipment" className="mt-6">
          <EquipmentManagement />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <LaboratoryDocumentManager />
        </TabsContent>

        <TabsContent value="store" className="mt-6">
          <StoreManagement department="laboratory" departmentName="Laboratory" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDepartment;
