
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorsesDashboard from "@/components/horses/HorsesDashboard";
import HorseManagement from "@/components/horses/HorseManagement";

const HorsesDepartment = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horses Department</h1>
        <p className="text-muted-foreground">Comprehensive horse management and monitoring system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="horses">Horse Registry</TabsTrigger>
          <TabsTrigger value="pedigree">Pedigree</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="health">Health Records</TabsTrigger>
          <TabsTrigger value="breeding">Breeding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <HorsesDashboard />
        </TabsContent>
        
        <TabsContent value="horses" className="mt-6">
          <HorseManagement />
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
        
        <TabsContent value="breeding" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Breeding Management</h3>
            <p className="text-muted-foreground">Breeding schedules and offspring tracking</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorsesDepartment;
