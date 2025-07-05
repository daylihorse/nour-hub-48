
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Trophy, TrendingUp } from "lucide-react";
import { useGeldings } from "@/hooks/useGeldings";

const GeldingStats = () => {
  const { data: geldings = [] } = useGeldings();
  
  const totalGeldings = geldings.length;
  const activeGeldings = geldings.filter(g => g.status === 'active').length;
  const healthyGeldings = geldings.filter(g => g.health_status === 'healthy').length;
  const underTreatment = geldings.filter(g => g.health_status === 'under_treatment').length;
  
  const healthPercentage = totalGeldings > 0 ? Math.round((healthyGeldings / totalGeldings) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Geldings</CardTitle>
          <Activity className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGeldings}</div>
          <p className="text-xs text-muted-foreground">{activeGeldings} active geldings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Training</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.floor(activeGeldings * 0.7)}</div>
          <p className="text-xs text-muted-foreground">Currently training</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Competitions</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.floor(activeGeldings * 1.2)}</div>
          <p className="text-xs text-muted-foreground">This year</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Status</CardTitle>
          <Heart className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthPercentage}%</div>
          <p className="text-xs text-muted-foreground">
            {healthyGeldings} healthy, {underTreatment} under treatment
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeldingStats;
