
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  DollarSign,
  Zap,
  Droplets,
  Thermometer,
  Settings
} from "lucide-react";

const MaintenanceDepartment = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const maintenanceStats = {
    totalTasks: 24,
    completedToday: 8,
    pendingTasks: 12,
    emergencyTasks: 2,
    monthlyBudget: 15000,
    spentThisMonth: 8500
  };

  const recentTasks = [
    {
      id: "MT001",
      title: "Water System Inspection",
      type: "Routine",
      priority: "Medium",
      assignedTo: "John Martinez",
      dueDate: "Today",
      status: "In Progress",
      facility: "Stable Block A"
    },
    {
      id: "MT002", 
      title: "Arena Footing Repair",
      type: "Repair",
      priority: "High",
      assignedTo: "Mike Johnson",
      dueDate: "Tomorrow",
      status: "Pending",
      facility: "Main Arena"
    },
    {
      id: "MT003",
      title: "Electrical Safety Check",
      type: "Safety",
      priority: "High",
      assignedTo: "Sarah Wilson",
      dueDate: "Today",
      status: "Completed",
      facility: "Barn B"
    }
  ];

  const equipmentStatus = [
    { name: "Water Pumps", status: "operational", lastMaintenance: "2024-01-10" },
    { name: "HVAC System", status: "needs_attention", lastMaintenance: "2024-01-05" },
    { name: "Lighting System", status: "operational", lastMaintenance: "2024-01-12" },
    { name: "Fire Safety", status: "operational", lastMaintenance: "2024-01-08" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Maintenance Department</h1>
        <p className="text-muted-foreground">Comprehensive facility maintenance and equipment management</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Tasks</p>
                      <p className="text-lg font-bold">{maintenanceStats.totalTasks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Completed Today</p>
                      <p className="text-lg font-bold">{maintenanceStats.completedToday}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-lg font-bold">{maintenanceStats.pendingTasks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Emergency</p>
                      <p className="text-lg font-bold">{maintenanceStats.emergencyTasks}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget Used</p>
                      <p className="text-lg font-bold">
                        {Math.round((maintenanceStats.spentThisMonth / maintenanceStats.monthlyBudget) * 100)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Active Staff</p>
                      <p className="text-lg font-bold">6</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tasks & Equipment Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Maintenance Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground">{task.facility}</p>
                          </div>
                          <div className="flex gap-2">
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Assigned to: {task.assignedTo}</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Equipment Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipmentStatus.map((equipment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{equipment.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last maintenance: {equipment.lastMaintenance}
                          </p>
                        </div>
                        <Badge 
                          variant={equipment.status === 'operational' ? 'default' : 'destructive'}
                        >
                          {equipment.status === 'operational' ? 'Operational' : 'Needs Attention'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Tasks Management</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Task Scheduling & Management</h3>
              <p className="text-muted-foreground">
                Schedule routine maintenance, assign tasks to team members, and track completion
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="equipment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Management</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Equipment Tracking & Servicing</h3>
              <p className="text-muted-foreground">
                Monitor equipment health, schedule preventive maintenance, and manage service records
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Facility Management</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Zap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Facility Systems</h3>
              <p className="text-muted-foreground">
                Manage electrical, plumbing, HVAC, and other facility systems
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Request Management</h3>
              <p className="text-muted-foreground">
                Handle maintenance requests from staff, prioritize urgent repairs, and track resolution
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Financial & Performance Reports</h3>
              <p className="text-muted-foreground">
                Track maintenance costs, analyze performance metrics, and generate budget reports
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceDepartment;
