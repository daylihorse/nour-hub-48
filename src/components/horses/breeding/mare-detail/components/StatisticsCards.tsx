
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Statistic {
  title: string;
  value: string;
  description: string;
  trend: string;
}

interface StatisticsCardsProps {
  statistics: Statistic[];
}

const StatisticsCards = ({ statistics }: StatisticsCardsProps) => {
  const getTrendIcon = (trend: string) => {
    if (trend.includes('+') || trend === 'Excellent' || trend === 'Good') {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    if (trend.includes('-')) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statistics.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                <span className="text-xs">{stat.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
