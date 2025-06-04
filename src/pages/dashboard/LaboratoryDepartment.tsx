
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaboratoryDashboard from "@/components/laboratory/LaboratoryDashboard";
import SampleManagement from "@/components/laboratory/SampleManagement";
import TestRequests from "@/components/laboratory/TestRequests";
import TestResults from "@/components/laboratory/TestResults";
import ResultComparison from "@/components/laboratory/ResultComparison";
import EquipmentManagement from "@/components/laboratory/EquipmentManagement";
import QualityControl from "@/components/laboratory/QualityControl";
import TemplateManagement from "@/components/laboratory/TemplateManagement";

const LaboratoryDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Comprehensive laboratory testing and analysis management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="samples">Sample Management</TabsTrigger>
          <TabsTrigger value="tests">Test Requests</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <LaboratoryDashboard />
        </TabsContent>
        
        <TabsContent value="samples" className="mt-6">
          <SampleManagement />
        </TabsContent>
        
        <TabsContent value="tests" className="mt-6">
          <TestRequests />
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <TestResults />
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-6">
          <ResultComparison />
        </TabsContent>
        
        <TabsContent value="equipment" className="mt-6">
          <EquipmentManagement />
        </TabsContent>
        
        <TabsContent value="quality" className="mt-6">
          <QualityControl />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <TemplateManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDepartment;
