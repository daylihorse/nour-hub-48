
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AnalyticsMetric } from "@/types/analytics";

interface MetricsGridProps {
  metrics: AnalyticsMetric[];
  loading: boolean;
}

const MetricsGrid = ({ metrics, loading }: MetricsGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatValue = (value: number, category: string) => {
    if (category === 'financial') {
      return `$${value.toLocaleString()}`;
    }
    if (category === 'service' && value <= 5) {
      return value.toFixed(1);
    }
    return value.toLocaleString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                {formatValue(metric.value, metric.category)}
              </p>
              {metric.changePercentage !== undefined && (
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.changePercentage > 0 ? '+' : ''}
                    {metric.changePercentage.toFixed(1)}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs last {metric.period}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
