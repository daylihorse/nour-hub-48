
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  Users, 
  Wrench, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  BarChart3
} from "lucide-react";

const StableRoomsDashboard = () => {
  // Mock data - in real implementation, this would come from a service
  const metrics = {
    totalRooms: 156,
    occupiedRooms: 142,
    availableRooms: 8,
    maintenanceRooms: 6,
    occupancyRate: 91.0,
    monthlyRevenue: 45600,
    pendingMaintenance: 12,
    upcomingCheckouts: 5
  };

  const recentActivity = [
    { id: 1, type: "assignment", message: "Stallion Storm assigned to Stall A-15", time: "2 hours ago" },
    { id: 2, type: "maintenance", message: "Routine cleaning completed for Building B", time: "4 hours ago" },
    { id: 3, type: "checkout", message: "Mare Luna checked out from Paddock C-03", time: "6 hours ago" },
    { id: 4, type: "maintenance", message: "Emergency repair scheduled for Stall A-08", time: "8 hours ago" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Quarterly facility inspection", date: "Tomorrow", type: "inspection" },
    { id: 2, title: "Paddock C renovation starts", date: "Next Monday", type: "maintenance" },
    { id: 3, title: "New equipment delivery", date: "Next Friday", type: "delivery" }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              Across all facilities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.occupiedRooms} of {metrics.totalRooms} occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingMaintenance}</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="inline h-3 w-3 mr-1 text-amber-500" />
              3 urgent tasks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Room Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Occupied</span>
              <div className="flex items-center gap-2">
                <Badge variant="default">{metrics.occupiedRooms}</Badge>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(metrics.occupiedRooms / metrics.totalRooms) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Available</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{metrics.availableRooms}</Badge>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(metrics.availableRooms / metrics.totalRooms) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Maintenance</span>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{metrics.maintenanceRooms}</Badge>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(metrics.maintenanceRooms / metrics.totalRooms) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="mt-1">
                    {activity.type === 'assignment' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'maintenance' && <Wrench className="h-4 w-4 text-orange-500" />}
                    {activity.type === 'checkout' && <Calendar className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Add New Room
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Wrench className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant="outline">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StableRoomsDashboard;
