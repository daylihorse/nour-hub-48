
import { Card, CardContent } from "@/components/ui/card";
import { Settings, CheckCircle, Wrench, Clock } from "lucide-react";

const EquipmentStats = () => {
  const stats = [
    {
      title: "Total Equipment",
      value: "24",
      icon: Settings,
      color: "text-blue-500"
    },
    {
      title: "Operational",
      value: "19",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "In Maintenance",
      value: "3",
      icon: Wrench,
      color: "text-orange-500"
    },
    {
      title: "Due for Service",
      value: "5",
      icon: Clock,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EquipmentStats;
