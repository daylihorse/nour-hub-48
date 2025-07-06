import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Settings, TrendingUp } from "lucide-react";
import { PaddockStats as PaddockStatsType } from "@/types/paddocks";

interface PaddockStatsProps {
  stats: PaddockStatsType;
}

const PaddockStats = ({ stats }: PaddockStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Paddocks</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPaddocks}</div>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {stats.availablePaddocks} Available
            </Badge>
            <Badge variant="outline" className="text-xs">
              {stats.occupiedPaddocks} Occupied
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Capacity</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.currentOccupancy}/{stats.totalCapacity}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total capacity utilization
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.utilizationRate.toFixed(1)}%</div>
          <div className="w-full bg-secondary rounded-full h-2 mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(stats.utilizationRate, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.maintenancePaddocks}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.upcomingMaintenance} upcoming tasks
          </p>
          {stats.upcomingMaintenance > 0 && (
            <Badge variant="destructive" className="text-xs mt-2">
              Attention Required
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockStats;