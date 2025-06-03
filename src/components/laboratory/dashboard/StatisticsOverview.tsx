
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube2, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const StatisticsOverview = () => {
  const stats = [
    {
      title: "Total Samples",
      value: "247",
      icon: TestTube2,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Pending Tests",
      value: "23",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      title: "Completed Today",
      value: "18",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Urgent Priority",
      value: "4",
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
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

export default StatisticsOverview;
