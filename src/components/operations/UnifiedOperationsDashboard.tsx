
import { 
  Package, 
  ArrowRightLeft, 
  Warehouse, 
  FlaskRound
} from "lucide-react";
import OperationsStatsCards from "./shared/OperationsStatsCards";
import OperationsAlertsCard from "./shared/OperationsAlertsCard";
import QuickActionsCard from "./shared/QuickActionsCard";
import { OperationsDataService } from "@/services/operations/operationsDataService";
import { QuickAction } from "@/types/operations";

const UnifiedOperationsDashboard = () => {
  // Use centralized data service
  const alerts = OperationsDataService.getMockAlerts();
  const operationsStats = OperationsDataService.getMockOperationsStats();

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Unified Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive facility management and cross-departmental operations
        </p>
      </div>

      {/* Operations Stats */}
      <OperationsStatsCards stats={operationsStats} />

      {/* Quick Actions */}
      <QuickActionsCard actions={quickActions} />

      {/* Alerts and Notifications */}
      <OperationsAlertsCard alerts={alerts} />
    </div>
  );
};

export default UnifiedOperationsDashboard;
