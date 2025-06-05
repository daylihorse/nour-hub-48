
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FoalingDashboard from "./foaling/FoalingDashboard";
import BirthRecords from "./foaling/BirthRecords";
import FoalRecords from "./foaling/FoalRecords";
import ExpectedFoalings from "./foaling/ExpectedFoalings";

const FoalingManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Foaling Management</h1>
        <p className="text-muted-foreground">
          Comprehensive birth tracking and foal record management
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="expected">Expected Foalings</TabsTrigger>
          <TabsTrigger value="births">Birth Records</TabsTrigger>
          <TabsTrigger value="foals">Foal Registry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <FoalingDashboard />
        </TabsContent>
        
        <TabsContent value="expected" className="mt-6">
          <ExpectedFoalings />
        </TabsContent>
        
        <TabsContent value="births" className="mt-6">
          <BirthRecords />
        </TabsContent>
        
        <TabsContent value="foals" className="mt-6">
          <FoalRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoalingManagement;
