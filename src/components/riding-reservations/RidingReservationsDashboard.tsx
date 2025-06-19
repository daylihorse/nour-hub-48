import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  Rabbit, 
  MapPin, 
  Star, 
  CreditCard, 
  Clock, 
  TrendingUp,
  Eye,
  Plus,
  Activity
} from "lucide-react";

const RidingReservationsDashboard = () => {
  const metrics = {
    totalReservations: 156,
    todayReservations: 12,
    activeGuides: 8,
    availableHorses: 15,
    monthlyRevenue: 28750,
    averageRating: 4.8,
    occupancyRate: 78,
    pendingBookings: 5
  };

  const todaySchedule = [
    {
      id: 1,
      time: "09:00",
      experience: "Mountain Trail Adventure",
      guide: "Sarah Johnson",
      guests: 4,
      duration: "3 hours",
      status: "confirmed"
    },
    {
      id: 2,
      time: "11:30",
      experience: "Beach Sunset Ride",
      guide: "Mike Rodriguez",
      guests: 2,
      duration: "1.5 hours",
      status: "confirmed"
    },
    {
      id: 3,
      time: "14:00",
      experience: "Family Fun Ride",
      guide: "Emma Wilson",
      guests: 6,
      duration: "2 hours",
      status: "pending"
    },
    {
      id: 4,
      time: "16:30",
      experience: "Private Lesson",
      guide: "David Chen",
      guests: 1,
      duration: "1 hour",
      status: "confirmed"
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "Alice Cooper",
      experience: "Sunset Trail Ride",
      date: "Today",
      status: "confirmed",
      amount: 125
    },
    {
      id: 2,
      guest: "John Smith",
      experience: "Mountain Adventure",
      date: "Tomorrow",
      status: "pending",
      amount: 185
    },
    {
      id: 3,
      guest: "Mary Johnson",
      experience: "Family Experience",
      date: "Today",
      status: "confirmed",
      amount: 290
    },
    {
      id: 4,
      guest: "Robert Brown",
      experience: "Private Training",
      date: "Next Week",
      status: "confirmed",
      amount: 200
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Riding Reservations Dashboard</h2>
        <p className="text-muted-foreground">
          Comprehensive overview of riding experiences, bookings, and guest management
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Reservations</p>
                <p className="text-lg font-bold">{metrics.totalReservations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Today's Rides</p>
                <p className="text-lg font-bold">{metrics.todayReservations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-orange-500" />
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
              <Rabbit className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Available Horses</p>
                <p className="text-lg font-bold">{metrics.availableHorses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-emerald-500" />
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
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Average Rating</p>
                <p className="text-lg font-bold">{metrics.averageRating}/5.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-xs text-muted-foreground">Occupancy Rate</p>
                <p className="text-lg font-bold">{metrics.occupancyRate}%</p>
                <Progress value={metrics.occupancyRate} className="h-2 mt-1" />
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
              {todaySchedule.map((ride) => (
                <div key={ride.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{ride.time} - {ride.experience}</p>
                    <p className="text-sm text-muted-foreground">
                      Guide: {ride.guide} • {ride.guests} guest{ride.guests > 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">Duration: {ride.duration}</p>
                  </div>
                  {getStatusBadge(ride.status)}
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
                    <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">{booking.experience}</p>
                    <p className="text-sm text-muted-foreground">{booking.date} • ${booking.amount}</p>
                  </div>
                  {getStatusBadge(booking.status)}
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
              <Plus className="h-6 w-6" />
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

export default RidingReservationsDashboard; 