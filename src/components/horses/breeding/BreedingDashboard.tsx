
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Calendar, TrendingUp, AlertCircle, CheckCircle, FileText, TreePine, BarChart, FolderOpen, Sparkles } from "lucide-react";

const BreedingDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalStallions: 8,
    activeStallions: 6,
    totalMares: 25,
    pregnantMares: 7,
    expectedFoals: 7,
    totalBookings: 12,
    successRate: 85.5,
  };

  const recentActivity = [
    {
      id: 1,
      type: "breeding",
      message: "Breeding completed: Thunder × Lightning",
      date: "2 hours ago",
      status: "success",
    },
    {
      id: 2,
      type: "pregnancy",
      message: "Pregnancy confirmed: Bella (Day 18)",
      date: "1 day ago",
      status: "success",
    },
    {
      id: 3,
      type: "booking",
      message: "New booking request: Storm × Aurora",
      date: "2 days ago",
      status: "pending",
    },
    {
      id: 4,
      type: "birth",
      message: "Foal born: Whisper's colt",
      date: "3 days ago",
      status: "success",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      type: "due_date",
      title: "Expected Foaling",
      horse: "Bella",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      type: "checkup",
      title: "Pregnancy Checkup",
      horse: "Luna",
      date: "2024-01-10",
      priority: "medium",
    },
    {
      id: 3,
      type: "breeding",
      title: "Scheduled Breeding",
      horse: "Thunder × Storm",
      date: "2024-01-08",
      priority: "medium",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* New Features Highlight */}
      <Card className="border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Enhanced Breeding Features
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore our advanced breeding management capabilities
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              New
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-sm">Certificate Generator</h4>
                <p className="text-xs text-muted-foreground">Professional breeding certificates</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <TreePine className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium text-sm">Pedigree Trees</h4>
                <p className="text-xs text-muted-foreground">Interactive family trees</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <BarChart className="h-6 w-6 text-purple-600" />
              <div>
                <h4 className="font-medium text-sm">Performance Analytics</h4>
                <p className="text-xs text-muted-foreground">Advanced success metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <FolderOpen className="h-6 w-6 text-orange-600" />
              <div>
                <h4 className="font-medium text-sm">Document Management</h4>
                <p className="text-xs text-muted-foreground">Centralized document storage</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stallions</CardTitle>
            <Heart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStallions}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalStallions} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pregnant Mares</CardTitle>
            <Baby className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pregnantMares}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalMares} total mares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Foals</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expectedFoals}</div>
            <p className="text-xs text-muted-foreground">
              Next 90 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-green-600">+2.5% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{event.title}</span>
                      <Badge variant={getPriorityColor(event.priority) as any} className="text-xs">
                        {event.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.horse}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pregnancy Progress */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pregnancy Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Bella</span>
                  <span className="text-sm text-muted-foreground">Day 280/340</span>
                </div>
                <Progress value={82} className="h-2" />
                <p className="text-xs text-muted-foreground">Expected: Jan 15, 2024</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Luna</span>
                  <span className="text-sm text-muted-foreground">Day 180/340</span>
                </div>
                <Progress value={53} className="h-2" />
                <p className="text-xs text-muted-foreground">Expected: Mar 20, 2024</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aurora</span>
                  <span className="text-sm text-muted-foreground">Day 45/340</span>
                </div>
                <Progress value={13} className="h-2" />
                <p className="text-xs text-muted-foreground">Expected: Sep 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreedingDashboard;
