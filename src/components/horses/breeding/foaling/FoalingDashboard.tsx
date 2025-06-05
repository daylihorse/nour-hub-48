
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Baby, Calendar, Heart, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const FoalingDashboard = () => {
  const stats = {
    expectedThisMonth: 3,
    totalExpected: 7,
    recentBirths: 2,
    healthyFoals: 8,
    totalFoals: 10,
    overduePregnancies: 1,
  };

  const upcomingBirths = [
    {
      id: "1",
      mareName: "Bella",
      expectedDate: "2024-01-15",
      daysRemaining: 8,
      status: "due_soon",
      stallionName: "Thunder",
    },
    {
      id: "2",
      mareName: "Luna",
      expectedDate: "2024-01-22",
      daysRemaining: 15,
      status: "monitoring",
      stallionName: "Lightning",
    },
    {
      id: "3",
      mareName: "Storm",
      expectedDate: "2024-01-05",
      daysRemaining: -2,
      status: "overdue",
      stallionName: "Thunder",
    },
  ];

  const recentBirths = [
    {
      id: "1",
      foalName: "Thunder's Colt",
      mareName: "Whisper",
      birthDate: "2024-01-02",
      gender: "male",
      status: "healthy",
      birthWeight: 45,
    },
    {
      id: "2",
      foalName: "Lightning's Filly",
      mareName: "Grace",
      birthDate: "2023-12-28",
      gender: "female",
      status: "healthy",
      birthWeight: 42,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due_soon":
        return "default";
      case "overdue":
        return "destructive";
      case "monitoring":
        return "secondary";
      case "healthy":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expectedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalExpected} total expected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Births</CardTitle>
            <Baby className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentBirths}</div>
            <p className="text-xs text-green-600">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Foals</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.healthyFoals}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.totalFoals} total foals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overduePregnancies}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Births */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Births
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBirths.map((birth) => (
                <div key={birth.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{birth.mareName}</span>
                      <Badge variant={getStatusColor(birth.status) as any} className="text-xs">
                        {birth.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sire: {birth.stallionName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(birth.expectedDate)}</p>
                    <p className="text-xs text-muted-foreground">
                      {birth.daysRemaining > 0 ? `${birth.daysRemaining} days` : `${Math.abs(birth.daysRemaining)} days overdue`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Births */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby className="h-5 w-5" />
              Recent Births
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBirths.map((birth) => (
                <div key={birth.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{birth.foalName}</span>
                      <Badge variant={getStatusColor(birth.status) as any} className="text-xs">
                        {birth.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Dam: {birth.mareName} • {birth.gender} • {birth.birthWeight}kg
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(birth.birthDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Birth Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Birth Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Bella (Due Soon)</span>
                <span className="text-sm text-muted-foreground">Day 332/340</span>
              </div>
              <Progress value={98} className="h-2" />
              <p className="text-xs text-muted-foreground">Expected: Jan 15, 2024</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Luna (Monitoring)</span>
                <span className="text-sm text-muted-foreground">Day 325/340</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-muted-foreground">Expected: Jan 22, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoalingDashboard;
