
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaddockDashboard from "@/components/paddocks/PaddockDashboard";
import PaddockManagement from "@/components/paddocks/PaddockManagement";
import PaddockMaintenanceScheduler from "@/components/paddocks/PaddockMaintenanceScheduler";
import PaddockRotationPlanner from "@/components/paddocks/PaddockRotationPlanner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { BarChart3, MapPin, Calendar, Settings } from "lucide-react";

const Paddocks = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paddock Management</h1>
          <p className="text-muted-foreground">Manage pastures, exercise areas, and grazing rotation</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
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
          
          <TabsContent value="dashboard" className="mt-6">
            <ErrorBoundary>
              <PaddockDashboard />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="paddocks" className="mt-6">
            <ErrorBoundary>
              <PaddockManagement />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="rotation" className="mt-6">
            <ErrorBoundary>
              <PaddockRotationPlanner />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6">
            <ErrorBoundary>
              <PaddockMaintenanceScheduler />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default Paddocks;
