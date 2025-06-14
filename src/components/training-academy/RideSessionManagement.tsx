
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Horse, Clock, Users, Plus, Star, MapPin, Calendar } from "lucide-react";

const RideSessionManagement = () => {
  const rideTypes = [
    {
      id: 1,
      name: "Scenic Trail Ride",
      duration: "2 hours",
      maxRiders: 6,
      currentBookings: 4,
      price: 75,
      difficulty: "Beginner",
      description: "Gentle ride through beautiful countryside with stunning views",
      routes: ["Mountain Vista Trail", "Lakeside Path", "Meadow Loop"],
      horses: ["Thunder", "Spirit", "Gentle Ben", "Star", "Luna", "Shadow"]
    },
    {
      id: 2,
      name: "Beach Sunset Ride",
      duration: "1.5 hours",
      maxRiders: 4,
      currentBookings: 3,
      price: 95,
      difficulty: "Beginner",
      description: "Magical sunset ride along pristine beaches",
      routes: ["Coastal Path", "Dune Trail"],
      horses: ["Ocean", "Breeze", "Sunset", "Wave"]
    },
    {
      id: 3,
      name: "Mountain Adventure",
      duration: "3 hours",
      maxRiders: 4,
      currentBookings: 2,
      price: 125,
      difficulty: "Intermediate",
      description: "Challenging ride through mountain terrain with expert guides",
      routes: ["Summit Trail", "Ridge Path", "Valley Adventure"],
      horses: ["Storm", "Blaze", "Rocky", "Eagle"]
    },
    {
      id: 4,
      name: "Forest Discovery",
      duration: "2.5 hours",
      maxRiders: 5,
      currentBookings: 3,
      price: 85,
      difficulty: "Intermediate",
      description: "Explore ancient forests and hidden trails",
      routes: ["Deep Forest Trail", "Canopy Walk", "Wildlife Path"],
      horses: ["Forest", "Maple", "Oak", "Pine", "Willow"]
    }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner Friendly</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'Advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ride Session Management</h2>
          <p className="text-muted-foreground">
            Manage riding experiences, routes, and horse assignments
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Experience
        </Button>
      </div>

      {/* Ride Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rideTypes.map((ride) => (
          <Card key={ride.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Horse className="h-5 w-5" />
                    {ride.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {getDifficultyBadge(ride.difficulty)}
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ride.duration}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${ride.price}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{ride.description}</p>
              
              {/* Booking Status */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Current Bookings</span>
                  <span className={`text-sm font-bold ${getOccupancyColor(ride.currentBookings, ride.maxRiders)}`}>
                    {ride.currentBookings}/{ride.maxRiders} riders
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(ride.currentBookings / ride.maxRiders) * 100}%` }}
                  />
                </div>
              </div>

              {/* Available Routes */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Available Routes
                </h4>
                <div className="flex flex-wrap gap-1">
                  {ride.routes.map((route, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {route}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Assigned Horses */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Horse className="h-3 w-3" />
                  Available Horses ({ride.horses.length})
                </h4>
                <div className="flex flex-wrap gap-1">
                  {ride.horses.slice(0, 4).map((horse, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {horse}
                    </Badge>
                  ))}
                  {ride.horses.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{ride.horses.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Manage Bookings
                </Button>
                <Button size="sm" variant="outline">
                  Edit Experience
                </Button>
                <Button size="sm" variant="outline">
                  <Star className="h-3 w-3" />
                </Button>
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
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Riders</p>
                <p className="text-lg font-bold">
                  {rideTypes.reduce((sum, ride) => sum + ride.currentBookings, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Horse className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Experiences</p>
                <p className="text-lg font-bold">{rideTypes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Routes</p>
                <p className="text-lg font-bold">
                  {rideTypes.reduce((sum, ride) => sum + ride.routes.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Occupancy</p>
                <p className="text-lg font-bold">
                  {Math.round((rideTypes.reduce((sum, ride) => sum + (ride.currentBookings / ride.maxRiders), 0) / rideTypes.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RideSessionManagement;
