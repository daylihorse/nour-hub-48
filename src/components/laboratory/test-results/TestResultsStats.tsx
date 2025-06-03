
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const TestResultsStats = () => {
  const stats = [
    {
      title: "Total Results",
      value: "284",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Normal",
      value: "241",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Abnormal",
      value: "38",
      icon: AlertTriangle,
      color: "text-orange-500"
    },
    {
      title: "Critical",
      value: "5",
      icon: XCircle,
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

export default TestResultsStats;
