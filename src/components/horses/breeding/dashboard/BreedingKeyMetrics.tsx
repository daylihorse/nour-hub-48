
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Baby, Calendar, TrendingUp } from "lucide-react";

interface BreedingKeyMetricsProps {
  stats: {
    totalStallions: number;
    activeStallions: number;
    totalMares: number;
    pregnantMares: number;
    expectedFoals: number;
    totalBookings: number;
    successRate: number;
  };
}

const BreedingKeyMetrics = ({ stats }: BreedingKeyMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Stallions</CardTitle>
          <Heart className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeStallions}</div>
          <p className="text-xs text-muted-foreground">
            of {stats.totalStallions} total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pregnant Mares</CardTitle>
          <Baby className="h-4 w-4 text-pink-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pregnantMares}</div>
          <p className="text-xs text-muted-foreground">
            of {stats.totalMares} total mares
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expected Foals</CardTitle>
          <Calendar className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.expectedFoals}</div>
          <p className="text-xs text-muted-foreground">
            Next 90 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.successRate}%</div>
          <p className="text-xs text-green-600">+2.5% from last year</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingKeyMetrics;
