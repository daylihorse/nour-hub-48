
import { 
  Package, 
  ArrowRightLeft, 
  Warehouse, 
  FlaskRound
} from "lucide-react";
import OperationsStatsCards from "./shared/OperationsStatsCards";
import OperationsAlertsCard from "./shared/OperationsAlertsCard";
import QuickActionsCard from "./shared/QuickActionsCard";
import { useOperationsData } from "@/hooks/useOperationsData";
import { QuickAction } from "@/types/operations";

const UnifiedOperationsDashboard = () => {
  const { alerts, stats, isLoading, error } = useOperationsData();

  const quickActions: QuickAction[] = [
    {
      title: "Process Arrival",
      icon: ArrowRightLeft,
      link: "/dashboard/movements",
      color: "bg-blue-500"
    },
    {
      title: "Assign Room",
      icon: Warehouse,
      link: "/dashboard/rooms",
      color: "bg-green-500"
    },
    {
      title: "Order Supplies",
      icon: Package,
      link: "/dashboard/inventory",
      color: "bg-orange-500"
    },
    {
      title: "Schedule Test",
      icon: FlaskRound,
      link: "/dashboard/laboratory",
      color: "bg-purple-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-red-600">
          Error loading operations data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Unified Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive facility management and cross-departmental operations
        </p>
      </div>

      {/* Operations Stats */}
      <OperationsStatsCards stats={stats} />

      {/* Quick Actions */}
      <QuickActionsCard actions={quickActions} />

      {/* Alerts and Notifications */}
      <OperationsAlertsCard alerts={alerts} />
    </div>
  );
};

export default UnifiedOperationsDashboard;
