
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Award, AlertTriangle } from "lucide-react";

const QualityMetricsOverview = () => {
  const metrics = [
    {
      title: "Overall Accuracy",
      value: "99.0%",
      change: "+0.3% from last month",
      icon: Target,
      color: "text-green-500",
      changeColor: "text-green-600"
    },
    {
      title: "Precision Rate",
      value: "98.3%",
      change: "+0.2% from last month",
      icon: TrendingUp,
      color: "text-blue-500",
      changeColor: "text-blue-600"
    },
    {
      title: "Compliance Score",
      value: "98%",
      change: "Last audit result",
      icon: Award,
      color: "text-purple-500",
      changeColor: "text-purple-600"
    },
    {
      title: "Failed Checks",
      value: "2",
      change: "This month",
      icon: AlertTriangle,
      color: "text-orange-500",
      changeColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${metric.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-xs ${metric.changeColor}`}>{metric.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QualityMetricsOverview;
