
import { ArrowUpRight, ArrowDownRight, Calendar, Clock, TruckIcon, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HorseMovementStatsProps {
  movements: Movement[];
}

const HorseMovementStats = ({ movements }: HorseMovementStatsProps) => {
  // Calculate statistics
  const totalMovements = movements.length;
  const arrivals = movements.filter(m => m.type === "arrival").length;
  const departures = movements.filter(m => m.type === "departure").length;
  
  const upcoming = movements.filter(m => {
    return m.status === "scheduled" && new Date(m.date) > new Date();
  }).length;

  const withoutHealthCert = movements.filter(m => !m.healthCertificate).length;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Movements
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMovements}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <div className="flex">
              <span className="font-medium text-emerald-600 mr-2">{arrivals} arrivals</span>
              <span className="font-medium text-purple-600">{departures} departures</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Movements</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcoming}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Scheduled for the future
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Arrivals</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {movements.filter(m => m.type === "arrival" && m.status === "completed").length}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Complete arrival records
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Missing Health Certs</CardTitle>
          <AlertCircle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{withoutHealthCert}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Movements without health certificates
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorseMovementStats;
