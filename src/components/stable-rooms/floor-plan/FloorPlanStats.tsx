import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Users, 
  Activity, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";
import { Room } from "@/types/stableRooms";

interface FloorPlanStatsProps {
  rooms: Room[];
  selectedBuilding: string;
  selectedFloor: string;
  buildings: Array<{ id: string; name: string; floors: string[] }>;
}

const FloorPlanStats = ({ rooms, selectedBuilding, selectedFloor, buildings }: FloorPlanStatsProps) => {
  // Calculate statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
  const reservedRooms = rooms.filter(r => r.status === 'reserved').length;
  
  const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
  
  // Room type distribution
  const roomTypeStats = rooms.reduce((acc, room) => {
    acc[room.type] = (acc[room.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Revenue calculation (mock)
  const totalRevenue = rooms
    .filter(r => r.status === 'occupied' && r.pricing)
    .reduce((sum, room) => sum + (room.pricing?.dailyRate || 0), 0);

  // Maintenance alerts
  const maintenanceAlerts = maintenanceRooms;
  
  // Building info
  const currentBuilding = buildings.find(b => b.id === selectedBuilding);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 75) return 'text-orange-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Occupancy */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className={`text-2xl font-bold ${getOccupancyColor(occupancyRate)}`}>
                {occupancyRate.toFixed(1)}%
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">
                  {occupiedRooms}/{totalRooms} rooms
                </span>
                {occupancyRate > 80 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-blue-500" />
          </div>
          <Progress value={occupancyRate} className="mt-2 h-2" />
        </CardContent>
      </Card>

      {/* Available Rooms */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Rooms</p>
              <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
              <p className="text-xs text-muted-foreground">Ready for assignment</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Revenue */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Daily Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-green-600">+12%</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Maintenance Alerts</p>
              <p className={`text-2xl font-bold ${maintenanceAlerts > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                {maintenanceAlerts}
              </p>
              <p className="text-xs text-muted-foreground">
                {maintenanceAlerts > 0 ? 'Needs attention' : 'All clear'}
              </p>
            </div>
            {maintenanceAlerts > 0 ? (
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Location Info */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="font-medium">{currentBuilding?.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedFloor.charAt(0).toUpperCase() + selectedFloor.slice(1)} Floor
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Rooms:</span>
                <p className="font-medium">{totalRooms}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Occupied:</span>
                <p className="font-medium text-blue-600">{occupiedRooms}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Available:</span>
                <p className="font-medium text-green-600">{availableRooms}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Type Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building className="h-5 w-5" />
            Room Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(roomTypeStats).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {type.replace('_', ' ')}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {count} room{count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={(count / totalRooms) * 100} 
                    className="w-16 h-2" 
                  />
                  <span className="text-sm font-medium w-10 text-right">
                    {((count / totalRooms) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Breakdown */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Occupied</span>
                <Badge className="bg-blue-500">{occupiedRooms}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Available</span>
                <Badge className="bg-green-500">{availableRooms}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Maintenance</span>
                <Badge className="bg-orange-500">{maintenanceRooms}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reserved</span>
                <Badge className="bg-purple-500">{reservedRooms}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">New assignments:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed checkouts:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maintenance completed:</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue generated:</span>
              <span className="font-medium text-green-600">{formatCurrency(totalRevenue)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanStats;
