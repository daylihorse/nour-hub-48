
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, Search, Filter, Plus, Eye, Edit, X } from "lucide-react";

const ReservationSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState("today");

  const reservations = [
    {
      id: "R001",
      studentName: "Alice Cooper",
      lessonType: "Private Lesson",
      instructor: "Sarah Johnson",
      date: "2024-01-15",
      time: "09:00 - 10:00",
      facility: "Main Arena",
      status: "confirmed",
      price: 85,
      notes: "Beginner level, first lesson"
    },
    {
      id: "R002",
      studentName: "John Smith",
      lessonType: "Group Lesson",
      instructor: "Mike Rodriguez",
      date: "2024-01-15",
      time: "10:30 - 11:30",
      facility: "Training Ring",
      status: "pending",
      price: 45,
      notes: "Intermediate level"
    },
    {
      id: "R003",
      studentName: "Mary Johnson",
      lessonType: "Trial Lesson",
      instructor: "Emma Wilson",
      date: "2024-01-15",
      time: "14:00 - 15:00",
      facility: "Beginner Arena",
      status: "confirmed",
      price: 60,
      notes: "Complete beginner"
    },
    {
      id: "R004",
      studentName: "David Brown",
      lessonType: "Advanced Training",
      instructor: "Sarah Johnson",
      date: "2024-01-16",
      time: "16:00 - 17:30",
      facility: "Jumping Arena",
      status: "cancelled",
      price: 120,
      notes: "Jumping focus"
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

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.lessonType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reservation System</h2>
          <p className="text-muted-foreground">
            Manage student bookings, lesson scheduling, and facility reservations
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Reservation
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student, instructor, or lesson type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Reservations ({filteredReservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{reservation.studentName}</h4>
                      {getStatusBadge(reservation.status)}
                      <Badge variant="outline">{reservation.id}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {reservation.lessonType} with {reservation.instructor}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {reservation.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reservation.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {reservation.facility}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${reservation.price}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {reservation.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {reservation.notes && (
                  <div className="bg-muted/30 p-2 rounded text-sm">
                    <strong>Notes:</strong> {reservation.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'confirmed').length}
              </p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {reservations.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {reservations.filter(r => r.status === 'cancelled').length}
              </p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                ${reservations.filter(r => r.status === 'confirmed').reduce((sum, r) => sum + r.price, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationSystem;
