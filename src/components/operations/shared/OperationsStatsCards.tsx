
import { Card, CardContent } from "@/components/ui/card";
import { 
  Rabbit, 
  Warehouse, 
  ArrowRightLeft, 
  Package, 
  FlaskRound, 
  Hospital, 
  DollarSign 
} from "lucide-react";
import { OperationsStats } from "@/types/operations";

interface OperationsStatsCardsProps {
  stats: OperationsStats;
}

const OperationsStatsCards = ({ stats }: OperationsStatsCardsProps) => {
  const statsConfig = [
    {
      label: "Active Horses",
      value: stats.activeHorses,
      icon: Rabbit,
      color: "text-blue-500"
    },
    {
      label: "Occupied Rooms",
      value: stats.occupiedRooms,
      icon: Warehouse,
      color: "text-green-500"
    },
    {
      label: "Movements",
      value: stats.pendingMovements,
      icon: ArrowRightLeft,
      color: "text-purple-500"
    },
    {
      label: "Low Stock",
      value: stats.lowStockItems,
      icon: Package,
      color: "text-orange-500"
    },
    {
      label: "Lab Tests",
      value: stats.pendingLabTests,
      icon: FlaskRound,
      color: "text-indigo-500"
    },
    {
      label: "Appointments",
      value: stats.scheduledAppointments,
      icon: Hospital,
      color: "text-red-500"
    },
    {
      label: "Invoices",
      value: stats.outstandingInvoices,
      icon: DollarSign,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OperationsStatsCards;
