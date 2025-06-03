
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, AlertCircle } from "lucide-react";

const TestRequestStats = () => {
  const stats = [
    {
      title: "Total Requests",
      value: "156",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      title: "Pending",
      value: "23",
      icon: Clock,
      color: "text-orange-500"
    },
    {
      title: "In Progress",
      value: "12",
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      title: "Urgent",
      value: "4",
      icon: AlertCircle,
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

export default TestRequestStats;
