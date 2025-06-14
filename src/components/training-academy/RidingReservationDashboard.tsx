import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Rabbit, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  MapPin,
  Star,
  Activity,
  Eye,
  UserCheck
} from "lucide-react";

const RidingReservationDashboard = () => {
  const metrics = {
    totalRiders: 89,
    activeGuides: 8,
    todayRides: 15,
    monthlyRevenue: 28400,
    occupancyRate: 82,
    averageRating: 4.9
  };

  const upcomingRides = [
    {
      id: 1,
      time: "09:00",
      type: "Scenic Trail Ride",
      guide: "Sarah Johnson",
      riders: 4,
      route: "Mountain Vista Trail",
      duration: "2 hours"
    },
    {
      id: 2,
      time: "11:30",
      type: "Beach Sunset Ride",
      guide: "Mike Rodriguez",
      riders: 2,
      route: "Coastal Path",
      duration: "1.5 hours"
    },
    {
      id: 3,
      time: "14:00",
      type: "Adventure Trail",
      guide: "Emma Wilson",
      riders: 6,
      route: "Forest Adventure",
      duration: "3 hours"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      rider: "Alice Cooper",
      experience: "Sunset Trail Ride",
      date: "Today",
      status: "confirmed",
      horse: "Thunder"
    },
    {
      id: 2,
      rider: "John Smith",
      experience: "Mountain Adventure",
      date: "Tomorrow",
      status: "pending",
      horse: "Spirit"
    },
    {
      id: 3,
      rider: "Mary Johnson",
      experience: "Beginner Ride",
      date: "Today",
      status: "confirmed",
      horse: "Gentle Ben"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Riding Reservations Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of horse riding experiences and bookings
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Riders</p>
                <p className="text-lg font-bold">{metrics.totalRiders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Active Guides</p>
                <p className="text-lg font-bold">{metrics.activeGuides}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Rabbit className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Today's Rides</p>
                <p className="text-lg font-bold">{metrics.todayRides}</p>
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
                <p className="text-xs text-muted-foreground">Booking Rate</p>
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
              Today's Ride Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRides.map((ride) => (
                <div key={ride.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{ride.time} - {ride.type}</p>
                    <p className="text-sm text-muted-foreground">
                      Guide: {ride.guide} • {ride.riders} rider{ride.riders > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {ride.route} • {ride.duration}
                    </p>
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
                    <p className="font-medium">{booking.rider}</p>
                    <p className="text-sm text-muted-foreground">{booking.experience}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} • Horse: {booking.horse}
                    </p>
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
              <Rabbit className="h-6 w-6" />
              <span>Horse Status</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="h-6 w-6" />
              <span>Trail Conditions</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Eye className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RidingReservationDashboard;
