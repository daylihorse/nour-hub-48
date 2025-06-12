
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  MapPin,
  Award,
  Activity,
  Star,
  UserCheck
} from "lucide-react";

const TrainingAcademyDashboard = () => {
  const metrics = {
    totalStudents: 156,
    activeInstructors: 12,
    todayLessons: 28,
    monthlyRevenue: 45200,
    occupancyRate: 78,
    averageRating: 4.8
  };

  const upcomingLessons = [
    {
      id: 1,
      time: "09:00",
      lesson: "Beginner Group Lesson",
      instructor: "Sarah Johnson",
      students: 6,
      facility: "Main Arena"
    },
    {
      id: 2,
      time: "10:30",
      lesson: "Private Jumping",
      instructor: "Mike Rodriguez",
      students: 1,
      facility: "Jumping Arena"
    },
    {
      id: 3,
      time: "14:00",
      lesson: "Intermediate Dressage",
      instructor: "Emma Wilson",
      students: 4,
      facility: "Dressage Arena"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      student: "Alice Cooper",
      lesson: "Private Lesson",
      date: "Today",
      status: "confirmed"
    },
    {
      id: 2,
      student: "John Smith",
      lesson: "Group Lesson",
      date: "Tomorrow",
      status: "pending"
    },
    {
      id: 3,
      student: "Mary Johnson",
      lesson: "Trial Lesson",
      date: "Today",
      status: "confirmed"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Training Academy Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of public riding lessons and academy operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Students</p>
                <p className="text-lg font-bold">{metrics.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Instructors</p>
                <p className="text-lg font-bold">{metrics.activeInstructors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Today's Lessons</p>
                <p className="text-lg font-bold">{metrics.todayLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                <p className="text-lg font-bold">${metrics.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-xs text-muted-foreground">Occupancy Rate</p>
                <p className="text-lg font-bold">{metrics.occupancyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
                <p className="text-lg font-bold">{metrics.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Lesson Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lesson.time} - {lesson.lesson}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.instructor} • {lesson.students} student{lesson.students > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">{lesson.facility}</p>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{booking.student}</p>
                    <p className="text-sm text-muted-foreground">{booking.lesson}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>New Booking</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Add Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="h-6 w-6" />
              <span>Facility Status</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Award className="h-6 w-6" />
              <span>Student Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingAcademyDashboard;
