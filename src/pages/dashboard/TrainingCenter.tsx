
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingCenterDashboard from "@/components/training/TrainingCenterDashboard";
import TrainingManagement from "@/components/training/TrainingManagement";
import TrainingIntegrations from "@/components/training/TrainingIntegrations";
import { Dumbbell, Settings, Network } from "lucide-react";

const TrainingCenter = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training Center</h1>
        <p className="text-muted-foreground">
          Comprehensive training management with cross-departmental integration
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Management
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <TrainingCenterDashboard />
        </TabsContent>
        
        <TabsContent value="management" className="mt-6">
          <TrainingManagement />
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6">
          <TrainingIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingCenter;
