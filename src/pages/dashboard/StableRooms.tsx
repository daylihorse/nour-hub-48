
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StableRoomsDashboard from "@/components/stable-rooms/StableRoomsDashboard";
import RoomManagement from "@/components/stable-rooms/RoomManagement";
import AssignmentManagement from "@/components/stable-rooms/AssignmentManagement";
import MaintenanceScheduling from "@/components/stable-rooms/MaintenanceScheduling";
import OccupancyAnalytics from "@/components/stable-rooms/OccupancyAnalytics";
import FloorPlanVisualization from "@/components/stable-rooms/FloorPlanVisualization";

const StableRooms = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stable Rooms Management</h1>
        <p className="text-muted-foreground">Comprehensive stable facility and stall management system</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rooms">Stall Management</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <StableRoomsDashboard />
        </TabsContent>
        
        <TabsContent value="rooms" className="mt-6">
          <RoomManagement />
        </TabsContent>
        
        <TabsContent value="assignments" className="mt-6">
          <AssignmentManagement />
        </TabsContent>
        
        <TabsContent value="maintenance" className="mt-6">
          <MaintenanceScheduling />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <OccupancyAnalytics />
        </TabsContent>
        
        <TabsContent value="floorplan" className="mt-6">
          <FloorPlanVisualization />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StableRooms;
