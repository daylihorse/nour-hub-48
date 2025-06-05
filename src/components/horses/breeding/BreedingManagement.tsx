
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreedingDashboard from "./BreedingDashboard";
import StallionManagement from "./StallionManagement";
import MareManagement from "./MareManagement";
import BreedingRecords from "./BreedingRecords";
import PregnancyManagement from "./PregnancyManagement";
import FoalingManagement from "./FoalingManagement";
import GeneticAnalysis from "./analysis/GeneticAnalysis";
import BreedingPlanner from "./planning/BreedingPlanner";

const BreedingManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Breeding & Reproduction</h1>
        <p className="text-muted-foreground">
          Comprehensive breeding management with genetic analysis and strategic planning
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="stallions">Stallions</TabsTrigger>
          <TabsTrigger value="mares">Mares</TabsTrigger>
          <TabsTrigger value="breeding">Records</TabsTrigger>
          <TabsTrigger value="pregnancies">Pregnancies</TabsTrigger>
          <TabsTrigger value="foaling">Foaling</TabsTrigger>
          <TabsTrigger value="genetics">Genetics</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <BreedingDashboard />
        </TabsContent>
        
        <TabsContent value="stallions" className="mt-6">
          <StallionManagement />
        </TabsContent>
        
        <TabsContent value="mares" className="mt-6">
          <MareManagement />
        </TabsContent>
        
        <TabsContent value="breeding" className="mt-6">
          <BreedingRecords />
        </TabsContent>
        
        <TabsContent value="pregnancies" className="mt-6">
          <PregnancyManagement />
        </TabsContent>
        
        <TabsContent value="foaling" className="mt-6">
          <FoalingManagement />
        </TabsContent>
        
        <TabsContent value="genetics" className="mt-6">
          <GeneticAnalysis />
        </TabsContent>
        
        <TabsContent value="planning" className="mt-6">
          <BreedingPlanner />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Breeding Reports & Analytics</h3>
            <p className="text-muted-foreground">Comprehensive performance reports and breeding analytics</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingManagement;
