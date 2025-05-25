
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaboratoryDashboard from "@/components/laboratory/LaboratoryDashboard";

const LaboratoryDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Comprehensive laboratory testing and analysis management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="samples">Sample Management</TabsTrigger>
          <TabsTrigger value="tests">Test Requests</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <LaboratoryDashboard />
        </TabsContent>
        
        <TabsContent value="samples" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Sample Management</h3>
            <p className="text-muted-foreground">Track sample collection, processing, and storage</p>
          </div>
        </TabsContent>
        
        <TabsContent value="tests" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Test Requests</h3>
            <p className="text-muted-foreground">Manage laboratory test orders and scheduling</p>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Test Results</h3>
            <p className="text-muted-foreground">View and manage laboratory test results</p>
          </div>
        </TabsContent>
        
        <TabsContent value="equipment" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Equipment Management</h3>
            <p className="text-muted-foreground">Monitor laboratory equipment and maintenance schedules</p>
          </div>
        </TabsContent>
        
        <TabsContent value="quality" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Quality Control</h3>
            <p className="text-muted-foreground">Quality assurance metrics and compliance tracking</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaboratoryDepartment;
