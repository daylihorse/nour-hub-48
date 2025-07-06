import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaddockManagement from "@/components/paddocks/PaddockManagement";
import PaddockMaintenanceScheduler from "@/components/paddocks/PaddockMaintenanceScheduler";
import PaddockRotationPlanner from "@/components/paddocks/PaddockRotationPlanner";
import { MapPin, Calendar, Settings } from "lucide-react";

const Paddocks = () => {
  const [activeTab, setActiveTab] = useState("paddocks");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paddock Management</h1>
        <p className="text-muted-foreground">Manage pastures, exercise areas, and grazing rotation</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="paddocks" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Paddocks
          </TabsTrigger>
          <TabsTrigger value="rotation" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Rotation Planning
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="paddocks" className="mt-6">
          <PaddockManagement />
        </TabsContent>
        
        <TabsContent value="rotation" className="mt-6">
          <PaddockRotationPlanner />
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-6">
          <PaddockMaintenanceScheduler />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Paddocks;
