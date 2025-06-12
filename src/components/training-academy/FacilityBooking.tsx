
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Settings } from "lucide-react";

const FacilityBooking = () => {
  const facilities = [
    {
      id: 1,
      name: "Main Arena",
      type: "Indoor Arena",
      capacity: 8,
      currentBooking: "Beginner Group Lesson",
      nextAvailable: "11:00 AM",
      status: "occupied",
      features: ["Mirrors", "Sound System", "Climate Control"]
    },
    {
      id: 2,
      name: "Jumping Arena",
      type: "Outdoor Arena",
      capacity: 4,
      currentBooking: null,
      nextAvailable: "Available Now",
      status: "available",
      features: ["Jump Course", "Timer System", "Viewing Area"]
    },
    {
      id: 3,
      name: "Beginner Arena",
      type: "Indoor Arena",
      capacity: 6,
      currentBooking: "Trial Lesson",
      nextAvailable: "3:00 PM",
      status: "occupied",
      features: ["Low Fencing", "Soft Footing", "Safety Equipment"]
    },
    {
      id: 4,
      name: "Dressage Arena",
      type: "Outdoor Arena",
      capacity: 2,
      currentBooking: null,
      nextAvailable: "Under Maintenance",
      status: "maintenance",
      features: ["Regulation Size", "Letter Markers", "Mirrors"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'occupied':
        return <Badge className="bg-red-100 text-red-800">Occupied</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Facility Booking</h2>
        <p className="text-muted-foreground">
          Monitor and manage arena availability and bookings
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{facility.name}</CardTitle>
                  <p className="text-muted-foreground">{facility.type}</p>
                </div>
                {getStatusBadge(facility.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Status */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Current Status:</span>
                    <span className={facility.currentBooking ? "text-red-600" : "text-green-600"}>
                      {facility.currentBooking || "Available"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Next Available:</span>
                    <span className="text-sm font-medium">{facility.nextAvailable}</span>
                  </div>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Capacity: {facility.capacity} riders</span>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {facility.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" disabled={facility.status !== 'available'}>
                    Book Now
                  </Button>
                  <Button size="sm" variant="outline">
                    View Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Facilities</p>
                <p className="text-lg font-bold">{facilities.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Available Now</p>
                <p className="text-lg font-bold">
                  {facilities.filter(f => f.status === 'available').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Occupied</p>
                <p className="text-lg font-bold">
                  {facilities.filter(f => f.status === 'occupied').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Maintenance</p>
                <p className="text-lg font-bold">
                  {facilities.filter(f => f.status === 'maintenance').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityBooking;
