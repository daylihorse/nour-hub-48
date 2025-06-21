
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePaddockService } from "@/hooks/usePaddockService";
import { MapPin, Users, Wrench, Calendar, TrendingUp, Activity } from "lucide-react";

const PaddockDashboard = () => {
  const { usePaddocks, usePaddockAssignments, useMaintenanceRecords } = usePaddockService();
  
  const { data: paddocks = [], isLoading: paddocksLoading } = usePaddocks();
  const { data: assignments = [], isLoading: assignmentsLoading } = usePaddockAssignments();
  const { data: maintenanceRecords = [], isLoading: maintenanceLoading } = useMaintenanceRecords();

  if (paddocksLoading || assignmentsLoading || maintenanceLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Calculate statistics
  const totalPaddocks = paddocks.length;
  const availablePaddocks = paddocks.filter(p => p.status === 'available').length;
  const occupiedPaddocks = paddocks.filter(p => p.status === 'occupied').length;
  const maintenancePaddocks = paddocks.filter(p => p.status === 'maintenance').length;

  const totalCapacity = paddocks.reduce((sum, p) => sum + p.capacity, 0);
  const totalOccupancy = paddocks.reduce((sum, p) => sum + p.currentOccupancy, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;

  const activeAssignments = assignments.filter(a => a.status === 'active').length;
  const scheduledMaintenance = maintenanceRecords.filter(m => m.status === 'scheduled').length;
  const inProgressMaintenance = maintenanceRecords.filter(m => m.status === 'in_progress').length;

  // Recent activities
  const recentActivities = [
    ...assignments.slice(0, 3).map(a => ({
      type: 'assignment',
      description: `${a.horseName} assigned to paddock`,
      date: a.assignedDate
    })),
    ...maintenanceRecords.slice(0, 2).map(m => ({
      type: 'maintenance',
      description: `${m.type.replace('_', ' ')} scheduled`,
      date: m.scheduledDate
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paddocks</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaddocks}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                {availablePaddocks} Available
              </Badge>
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                {occupiedPaddocks} Occupied
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {totalOccupancy} of {totalCapacity} spaces used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Horses currently assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledMaintenance + inProgressMaintenance}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                {scheduledMaintenance} Scheduled
              </Badge>
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                {inProgressMaintenance} In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Paddock Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paddocks.length > 0 ? (
                paddocks.slice(0, 5).map((paddock) => (
                  <div key={paddock.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{paddock.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {paddock.currentOccupancy}/{paddock.capacity} occupied • {paddock.location.section}
                      </div>
                    </div>
                    <Badge className={
                      paddock.status === 'available' ? 'bg-green-100 text-green-800' :
                      paddock.status === 'occupied' ? 'bg-blue-100 text-blue-800' :
                      paddock.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {paddock.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No paddocks available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'assignment' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No recent activity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceRecords.filter(m => m.status === 'scheduled').slice(0, 5).length > 0 ? (
              maintenanceRecords.filter(m => m.status === 'scheduled').slice(0, 5).map((maintenance) => (
                <div key={maintenance.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{maintenance.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {maintenance.type.replace('_', ' ').toUpperCase()} • 
                      Scheduled: {maintenance.scheduledDate.toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    {maintenance.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No upcoming maintenance scheduled
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaddockDashboard;
