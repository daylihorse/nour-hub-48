
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Grass, Activity, AlertTriangle, Calendar, Users } from "lucide-react";
import { usePaddockData } from "@/hooks/usePaddockData";

const PaddockDashboard = () => {
  const { paddocks, getPaddockStats } = usePaddockData();
  const stats = getPaddockStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-500';
      case 'available': return 'bg-blue-500';
      case 'maintenance': return 'bg-orange-500';
      case 'reserved': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grazing': return Grass;
      case 'exercise': return Activity;
      default: return MapPin;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Paddocks</p>
                <div className="text-2xl font-bold">{stats.totalPaddocks}</div>
              </div>
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
                <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={stats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Utilization Rate</p>
                <div className="text-2xl font-bold">{stats.utilizationRate}%</div>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={stats.utilizationRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maintenance Needed</p>
                <div className="text-2xl font-bold text-orange-600">{stats.maintenancePaddocks}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button>Add New Paddock</Button>
            <Button variant="outline">Schedule Maintenance</Button>
            <Button variant="outline">Create Rotation Plan</Button>
            <Button variant="outline">Assign Horses</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Paddock Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paddocks.slice(0, 5).map((paddock) => {
                const IconComponent = getTypeIcon(paddock.type);
                return (
                  <div key={paddock.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{paddock.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {paddock.number} • {paddock.currentOccupancy}/{paddock.capacity} horses
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(paddock.status)}>
                      {paddock.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Rotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paddocks
                .filter(p => p.rotationSchedule?.nextRotation)
                .slice(0, 5)
                .map((paddock) => (
                  <div key={paddock.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{paddock.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Next rotation: {paddock.rotationSchedule?.nextRotation.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {paddock.rotationSchedule?.rotationDuration} days
                    </Badge>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaddockDashboard;
