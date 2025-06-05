
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BarChart3, Target, Calendar } from "lucide-react";

interface HeatCycle {
  id: string;
  mareName: string;
  cycleLength: number;
  successful: boolean;
  breedingAttempts: number;
}

interface CycleAnalyticsProps {
  heatCycles: HeatCycle[];
}

const CycleAnalytics = ({ heatCycles }: CycleAnalyticsProps) => {
  const analytics = {
    avgCycleLength: Math.round(heatCycles.reduce((sum, c) => sum + c.cycleLength, 0) / heatCycles.length),
    successRate: Math.round((heatCycles.filter(c => c.successful).length / heatCycles.length) * 100),
    avgAttempts: Math.round(heatCycles.reduce((sum, c) => sum + c.breedingAttempts, 0) / heatCycles.length),
    regularCycles: Math.round((heatCycles.filter(c => c.cycleLength >= 19 && c.cycleLength <= 23).length / heatCycles.length) * 100)
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Cycle Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Success Rate</span>
                <span className="font-medium">{analytics.successRate}%</span>
              </div>
              <Progress value={analytics.successRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Regular Cycles (19-23 days)</span>
                <span className="font-medium">{analytics.regularCycles}%</span>
              </div>
              <Progress value={analytics.regularCycles} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analytics.avgCycleLength}</div>
                <p className="text-sm text-muted-foreground">Avg Cycle Length</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analytics.avgAttempts}</div>
                <p className="text-sm text-muted-foreground">Avg Attempts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Cycle Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Detailed cycle trend analysis coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CycleAnalytics;
