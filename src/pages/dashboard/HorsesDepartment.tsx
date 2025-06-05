
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorsesDashboard from "@/components/horses/HorsesDashboard";
import HorseManagement from "@/components/horses/HorseManagement";
import BreedingManagement from "@/components/horses/breeding/BreedingManagement";
import IntegrationDashboard from "@/components/integration/IntegrationDashboard";
import AutomationRulesPanel from "@/components/integration/AutomationRulesPanel";

const HorsesDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horses Department</h1>
        <p className="text-muted-foreground">Comprehensive horse management and monitoring system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-9 bg-slate-900 border border-slate-700 p-1.5 h-12">
          <TabsTrigger 
            value="dashboard" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="horses" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Horse Registry
          </TabsTrigger>
          <TabsTrigger 
            value="breeding" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Breeding
          </TabsTrigger>
          <TabsTrigger 
            value="pedigree" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Pedigree
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger 
            value="health" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Health Records
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Training
          </TabsTrigger>
          <TabsTrigger 
            value="integration" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Integration
          </TabsTrigger>
          <TabsTrigger 
            value="automation" 
            className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg font-semibold transition-all duration-200"
          >
            Automation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <HorsesDashboard />
        </TabsContent>
        
        <TabsContent value="horses" className="mt-6">
          <HorseManagement />
        </TabsContent>
        
        <TabsContent value="breeding" className="mt-6">
          <BreedingManagement />
        </TabsContent>
        
        <TabsContent value="pedigree" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Pedigree Management</h3>
            <p className="text-muted-foreground">Track lineage and breeding history</p>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Performance Records</h3>
            <p className="text-muted-foreground">Monitor training progress and competition results</p>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Health Records</h3>
            <p className="text-muted-foreground">Medical history and vaccination tracking</p>
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Training Management</h3>
            <p className="text-muted-foreground">Training schedules and progress tracking</p>
          </div>
        </TabsContent>
        
        <TabsContent value="integration" className="mt-6">
          <IntegrationDashboard />
        </TabsContent>
        
        <TabsContent value="automation" className="mt-6">
          <AutomationRulesPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorsesDepartment;
