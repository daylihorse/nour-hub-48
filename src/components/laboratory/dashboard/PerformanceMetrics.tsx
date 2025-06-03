
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PerformanceMetrics = () => {
  const metrics = [
    {
      title: "Daily Test Completion",
      value: 85,
      target: 100,
      unit: "%"
    },
    {
      title: "Equipment Utilization",
      value: 72,
      target: 100,
      unit: "%"
    },
    {
      title: "Sample Processing Time",
      value: 4.2,
      target: 6,
      unit: "hrs avg"
    },
    {
      title: "Quality Control Pass Rate",
      value: 98,
      target: 100,
      unit: "%"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.title} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{metric.title}</p>
                <p className="text-sm text-muted-foreground">
                  {metric.value} {metric.unit}
                </p>
              </div>
              <Progress 
                value={metric.unit === "hrs avg" ? (metric.target - metric.value) / metric.target * 100 : (metric.value / metric.target) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
