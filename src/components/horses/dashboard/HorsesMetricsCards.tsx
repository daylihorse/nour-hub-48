
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Calendar } from "lucide-react";

const HorsesMetricsCards = () => {
  const keyMetrics = [
    {
      title: "Total Horses",
      value: "63",
      change: "+2 this month",
      trend: "up",
      icon: Heart,
      color: "text-blue-600"
    },
    {
      title: "Healthy Horses",
      value: "63",
      change: "100%",
      trend: "stable",
      icon: Heart,
      color: "text-green-600"
    },
    {
      title: "In Training",
      value: "28",
      change: "+5 this week",
      trend: "up",
      icon: Activity,
      color: "text-orange-600"
    },
    {
      title: "Avg Age",
      value: "8.2 years",
      change: "+0.3 years",
      trend: "up",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {keyMetrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HorsesMetricsCards;
