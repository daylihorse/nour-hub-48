
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  MapPin, 
  Trophy, 
  Calendar,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";
import { useTrainingData } from "@/hooks/useTrainingData";

const TrainingDashboard = () => {
  const { metrics, programs, sessions, facilities, isLoading } = useTrainingData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const dashboardMetrics = [
    {
      title: "Active Programs",
      value: metrics.activePrograms,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Horses in Training",
      value: metrics.horsesInTraining,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Today's Sessions",
      value: metrics.todaySessions,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Available Facilities",
      value: metrics.availableFacilities,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title} className={`${metric.bgColor} ${metric.borderColor} border`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Active Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programs.slice(0, 5).map((program) => (
                <div key={program.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{program.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {program.discipline} • {program.duration} weeks
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={program.intensity === 'high' ? 'destructive' : program.intensity === 'medium' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {program.intensity}
                    </Badge>
                    <Badge variant="outline">
                      {program.currentParticipants}/{program.maxParticipants}
                    </Badge>
                  </div>
                </div>
              ))}
              {programs.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No active programs
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              Recent Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{session.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.type} • {session.duration} mins
                    </p>
                  </div>
                  <Badge 
                    variant={
                      session.status === 'completed' ? 'default' : 
                      session.status === 'in_progress' ? 'secondary' : 
                      'outline'
                    }
                    className="capitalize"
                  >
                    {session.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
              {sessions.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No recent sessions
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Facility Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-500" />
              Training Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facilities.map((facility) => (
                <div key={facility.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{facility.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {facility.type} • Capacity: {facility.capacity}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      facility.status === 'available' ? 'default' : 
                      facility.status === 'occupied' ? 'secondary' : 
                      facility.status === 'maintenance' ? 'destructive' :
                      'outline'
                    }
                    className="capitalize"
                  >
                    {facility.status}
                  </Badge>
                </div>
              ))}
              {facilities.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No facilities available
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Program Completion Rate</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Session Score</span>
                <span className="text-sm font-medium">8.2/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Horses Improved</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Facility Utilization</span>
                <span className="text-sm font-medium">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingDashboard;
