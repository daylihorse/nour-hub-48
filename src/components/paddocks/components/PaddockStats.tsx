import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { Paddock } from "@/types/paddocks";

interface PaddockStatsProps {
  paddocks: Paddock[];
}

const PaddockStats = ({ paddocks }: PaddockStatsProps) => {
  const totalPaddocks = paddocks.length;
  const availablePaddocks = paddocks.filter(p => p.status === "available").length;
  const occupiedPaddocks = paddocks.filter(p => p.status === "occupied").length;
  const maintenancePaddocks = paddocks.filter(p => p.status === "maintenance").length;
  const totalCapacity = paddocks.reduce((sum, p) => sum + p.capacity, 0);
  const totalOccupancy = paddocks.reduce((sum, p) => sum + p.currentOccupancy, 0);
  const utilizationRate = totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Paddocks</p>
              <p className="text-2xl font-bold">{totalPaddocks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold">{availablePaddocks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Occupied</p>
              <p className="text-2xl font-bold">{occupiedPaddocks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Utilization</p>
              <p className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockStats;