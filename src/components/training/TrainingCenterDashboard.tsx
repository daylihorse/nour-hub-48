
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Users, 
  Calendar, 
  TrendingUp, 
  Star,
  Clock,
  Award,
  Activity,
  BarChart3,
  Target
} from "lucide-react";

const TrainingCenterDashboard = () => {
  const centerStats = [
    {
      title: "Total Programs",
      value: "15",
      change: "+3 this month",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Active Participants",
      value: "142",
      change: "+12 this week",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Training Hours",
      value: "324",
      change: "This month",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2% improvement",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const disciplineStats = [
    { name: "Dressage", participants: 45, sessions: 78, color: "bg-blue-500" },
    { name: "Show Jumping", participants: 38, sessions: 65, color: "bg-green-500" },
    { name: "General Riding", participants: 35, sessions: 82, color: "bg-purple-500" },
    { name: "Therapeutic", participants: 24, sessions: 48, color: "bg-orange-500" }
  ];

  const topTrainers = [
    { name: "Sarah Johnson", programs: 4, rating: 4.9, speciality: "Basic Riding" },
    { name: "Michael Chen", programs: 3, rating: 4.8, speciality: "Dressage" },
    { name: "Emma Rodriguez", programs: 3, rating: 4.9, speciality: "Show Jumping" },
    { name: "Dr. Lisa Harper", programs: 2, rating: 5.0, speciality: "Therapeutic" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            Training Center Overview
          </h2>
          <p className="text-muted-foreground">
            Comprehensive training management and performance analytics
          </p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Full Analytics
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {centerStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discipline Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Training Disciplines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disciplineStats.map((discipline) => (
                <div key={discipline.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{discipline.name}</span>
                    <div className="text-sm text-muted-foreground">
                      {discipline.participants} participants
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${discipline.color}`}
                      style={{ width: `${(discipline.sessions / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {discipline.sessions} sessions this month
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Trainers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Performing Trainers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTrainers.map((trainer, index) => (
                <div key={trainer.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{trainer.name}</p>
                      <p className="text-xs text-muted-foreground">{trainer.speciality}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{trainer.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {trainer.programs} programs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Certification</span>
              </div>
              <p className="text-sm text-green-800">
                5 students earned Advanced Dressage certificates this month
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Performance</span>
              </div>
              <p className="text-sm text-blue-800">
                Average skill improvement rate increased by 15%
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">Enrollment</span>
              </div>
              <p className="text-sm text-purple-800">
                Record enrollment with 25 new students this month
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Horse Management</span>
              <Badge variant="outline" className="ml-auto">Active</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Finance System</span>
              <Badge variant="outline" className="ml-auto">Active</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Scheduling</span>
              <Badge variant="outline" className="ml-auto">Partial</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Documents</span>
              <Badge variant="outline" className="ml-auto">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingCenterDashboard;
