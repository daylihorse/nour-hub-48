
import { lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import OptimizedUnifiedOperationsDashboard from "@/components/operations/OptimizedUnifiedOperationsDashboard";

// Lazy load heavy components
const HorseArrivalWorkflow = lazy(() => import("@/components/operations/workflows/HorseArrivalWorkflow"));
const OptimizedInventoryFinanceIntegration = lazy(() => import("@/components/operations/integrations/OptimizedInventoryFinanceIntegration"));
const OptimizedRoomAssignmentIntegration = lazy(() => import("@/components/operations/integrations/OptimizedRoomAssignmentIntegration"));

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-1/3" />
    <Skeleton className="h-32 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
      <Skeleton className="h-24" />
    </div>
  </div>
);

const OptimizedUnifiedOperations = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Operations Overview</TabsTrigger>
          <TabsTrigger value="workflows">Cross-Dept Workflows</TabsTrigger>
          <TabsTrigger value="inventory-finance">Inventory & Finance</TabsTrigger>
          <TabsTrigger value="room-assignment">Room Assignment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <OptimizedUnifiedOperationsDashboard />
        </TabsContent>
        
        <TabsContent value="workflows" className="mt-6">
          <Suspense fallback={<LoadingSkeleton />}>
            <HorseArrivalWorkflow />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="inventory-finance" className="mt-6">
          <Suspense fallback={<LoadingSkeleton />}>
            <OptimizedInventoryFinanceIntegration />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="room-assignment" className="mt-6">
          <Suspense fallback={<LoadingSkeleton />}>
            <OptimizedRoomAssignmentIntegration />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OptimizedUnifiedOperations;
