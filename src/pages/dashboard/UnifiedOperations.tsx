
import UnifiedOperationsDashboard from "@/components/operations/UnifiedOperationsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import HorseArrivalWorkflow from "@/components/operations/workflows/HorseArrivalWorkflow";
import InventoryFinanceIntegration from "@/components/operations/integrations/InventoryFinanceIntegration";
import RoomAssignmentIntegration from "@/components/operations/integrations/RoomAssignmentIntegration";

const UnifiedOperations = () => {
  return (
    <div className="space-y-6">
      {/* Header with Back to Dashboard button */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Unified Operations</h1>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Operations Overview</TabsTrigger>
          <TabsTrigger value="workflows">Cross-Dept Workflows</TabsTrigger>
          <TabsTrigger value="inventory-finance">Inventory & Finance</TabsTrigger>
          <TabsTrigger value="room-assignment">Room Assignment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <UnifiedOperationsDashboard />
        </TabsContent>
        
        <TabsContent value="workflows" className="mt-6">
          <HorseArrivalWorkflow />
        </TabsContent>
        
        <TabsContent value="inventory-finance" className="mt-6">
          <InventoryFinanceIntegration />
        </TabsContent>
        
        <TabsContent value="room-assignment" className="mt-6">
          <RoomAssignmentIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedOperations;
