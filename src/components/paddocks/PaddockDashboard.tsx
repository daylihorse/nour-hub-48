import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePaddockData } from "@/hooks/usePaddockData";
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  CircleDashed, 
  Clock, 
  Leaf, 
  LayoutGrid, 
  RotateCw, 
  Users
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const PaddockDashboard = () => {
  const { paddocks, maintenanceRecords, rotationPlans } = usePaddockData();
  
  // Calculate summary metrics
  const totalPaddocks = paddocks.length;
  const availablePaddocks = paddocks.filter(p => p.status === "available").length;
  const occupiedPaddocks = paddocks.filter(p => p.status === "occupied").length;
  const maintenancePaddocks = paddocks.filter(p => p.status === "maintenance").length;
  const reservedPaddocks = paddocks.filter(p => p.status === "reserved").length;
  
  const totalCapacity = paddocks.reduce((sum, p) => sum + p.capacity, 0);
  const currentOccupancy = paddocks.reduce((sum, p) => sum + p.currentOccupancy, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((currentOccupancy / totalCapacity) * 100) : 0;
  
  const activeRotationPlans = rotationPlans.filter(p => p.status === "active").length;
  const scheduledMaintenanceTasks = maintenanceRecords.filter(r => r.status === "scheduled").length;
  
  // Calculate paddock type distribution
  const paddockTypes = paddocks.reduce((acc, paddock) => {
    acc[paddock.type] = (acc[paddock.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const paddockTypeData = Object.entries(paddockTypes).map(([name, value]) => ({ name, value }));
  
  // Calculate upcoming rotations
  const today = new Date();
  const upcomingRotations = paddocks
    .filter(p => p.rotationSchedule?.nextRotation && new Date(p.rotationSchedule.nextRotation) > today)
    .sort((a, b) => {
      const dateA = new Date(a.rotationSchedule!.nextRotation);
      const dateB = new Date(b.rotationSchedule!.nextRotation);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);
  
  // Calculate upcoming maintenance
  const upcomingMaintenance = maintenanceRecords
    .filter(r => r.status === "scheduled" && new Date(r.scheduledDate) > today)
    .sort((a, b) => {
      const dateA = new Date(a.scheduledDate);
      const dateB = new Date(b.scheduledDate);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);
  
  // Calculate paddock size distribution
  const paddockSizeData = [
    { 
      name: "Small (<1000 sq m)", 
      count: paddocks.filter(p => p.size.length * p.size.width < 1000).length 
    },
    { 
      name: "Medium (1000-5000 sq m)", 
      count: paddocks.filter(p => {
        const area = p.size.length * p.size.width;
        return area >= 1000 && area < 5000;
      }).length 
    },
    { 
      name: "Large (5000-10000 sq m)", 
      count: paddocks.filter(p => {
        const area = p.size.length * p.size.width;
        return area >= 5000 && area < 10000;
      }).length 
    },
    { 
      name: "X-Large (>10000 sq m)", 
      count: paddocks.filter(p => p.size.length * p.size.width >= 10000).length 
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Paddock Dashboard</h2>
          <p className="text-muted-foreground">Overview of paddock status, occupancy, and upcoming tasks</p>
        </div>
        <Button variant="outline">
          Refresh Data
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Paddocks</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>All paddock areas</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaddocks}</div>
            <div className="flex gap-2 mt-2 text-xs">
              <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {availablePaddocks} available
              </div>
              <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {occupiedPaddocks} occupied
              </div>
              <div className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                {maintenancePaddocks} maintenance
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>Horses assigned to paddocks</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-2">
              {currentOccupancy} horses out of {totalCapacity} capacity
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Rotation Plans</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Paddock rotation schedules</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRotationPlans}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Next rotation in {upcomingRotations.length > 0 
                ? `${Math.ceil((new Date(upcomingRotations[0].rotationSchedule!.nextRotation).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days` 
                : 'N/A'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Maintenance</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Upcoming maintenance tasks</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledMaintenanceTasks}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Next task in {upcomingMaintenance.length > 0 
                ? `${Math.ceil((new Date(upcomingMaintenance[0].scheduledDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days` 
                : 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Paddock Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Paddock Distribution by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paddockTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Number of Paddocks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Paddock Size Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Paddock Size Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paddockSizeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Paddocks" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Rotations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Upcoming Rotations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingRotations.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No upcoming rotations scheduled
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingRotations.map((paddock) => {
                  const daysUntil = Math.ceil(
                    (new Date(paddock.rotationSchedule!.nextRotation).getTime() - today.getTime()) / 
                    (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div key={paddock.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{paddock.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(paddock.rotationSchedule!.nextRotation).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Badge variant={daysUntil <= 3 ? "destructive" : daysUntil <= 7 ? "outline" : "secondary"}>
                          {daysUntil} days
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Upcoming Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMaintenance.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No upcoming maintenance tasks scheduled
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingMaintenance.map((record) => {
                  const paddock = paddocks.find(p => p.id === record.paddockId);
                  const daysUntil = Math.ceil(
                    (new Date(record.scheduledDate).getTime() - today.getTime()) / 
                    (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <div key={record.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{paddock?.name || record.paddockId}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.type.replace('_', ' ')} - {new Date(record.scheduledDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <Badge variant={daysUntil <= 3 ? "destructive" : daysUntil <= 7 ? "outline" : "secondary"}>
                          {daysUntil} days
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Paddock Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <div className="bg-blue-100 p-2 rounded-full">
                <CircleDashed className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold">{availablePaddocks}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Occupied</p>
                <p className="text-2xl font-bold">{occupiedPaddocks}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance</p>
                <p className="text-2xl font-bold">{maintenancePaddocks}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <div className="bg-purple-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Reserved</p>
                <p className="text-2xl font-bold">{reservedPaddocks}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center py-4 gap-2">
              <Users className="h-5 w-5" />
              <span>Assign Horses</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex flex-col items-center py-4 gap-2">
              <RotateCw className="h-5 w-5" />
              <span>Create Rotation</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex flex-col items-center py-4 gap-2">
              <Clock className="h-5 w-5" />
              <span>Schedule Maintenance</span>
            </Button>
            
            <Button variant="outline" className="h-auto flex flex-col items-center py-4 gap-2">
              <Leaf className="h-5 w-5" />
              <span>Soil Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockDashboard;
