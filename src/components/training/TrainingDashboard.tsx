
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  BookOpen,
  Activity
} from "lucide-react";

const TrainingDashboard = () => {
  const stats = [
    {
      title: "Active Programs",
      value: "12",
      icon: Target,
      description: "Running training programs",
      color: "text-blue-600"
    },
    {
      title: "Total Trainers",
      value: "8",
      icon: Users,
      description: "Certified instructors",
      color: "text-green-600"
    },
    {
      title: "This Week's Sessions",
      value: "34",
      icon: Calendar,
      description: "Scheduled training sessions",
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: TrendingUp,
      description: "Program completion rate",
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      title: "New enrollment in Advanced Dressage",
      time: "2 hours ago",
      type: "enrollment"
    },
    {
      title: "Training session completed - Show Jumping",
      time: "4 hours ago",
      type: "session"
    },
    {
      title: "Trainer assessment scheduled",
      time: "1 day ago",
      type: "assessment"
    },
    {
      title: "New training program created",
      time: "2 days ago",
      type: "program"
    }
  ];

  const upcomingEvents = [
    {
      title: "Dressage Competition Prep",
      date: "Tomorrow",
      time: "2:00 PM",
      trainer: "Michael Chen"
    },
    {
      title: "Basic Riding Assessment",
      date: "Dec 22",
      time: "10:00 AM",
      trainer: "Sarah Johnson"
    },
    {
      title: "Show Jumping Workshop",
      date: "Dec 23",
      time: "9:00 AM",
      trainer: "Emma Rodriguez"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-xs text-blue-600">Trainer: {event.trainer}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="flex items-center gap-2 h-12">
              <Target className="h-4 w-4" />
              Create Program
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <Users className="h-4 w-4" />
              Add Trainer
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <Calendar className="h-4 w-4" />
              Schedule Session
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-12">
              <Award className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Training Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-sm text-muted-foreground">Student Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <p className="text-sm text-muted-foreground">Hours Trained This Month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">23</div>
              <p className="text-sm text-muted-foreground">Certifications Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingDashboard;
