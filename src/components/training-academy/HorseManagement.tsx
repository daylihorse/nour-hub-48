
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Horse, Heart, Search, Filter, Plus, Eye, Edit, Calendar } from "lucide-react";

const HorseManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const horses = [
    {
      id: "H001",
      name: "Thunder",
      breed: "Quarter Horse",
      age: 8,
      temperament: "Calm",
      experience: "Beginner Friendly",
      status: "available",
      healthStatus: "excellent",
      lastCheckup: "2024-01-10",
      ridesToday: 2,
      maxRides: 4,
      specialties: ["Trail Riding", "Scenic Tours"],
      nextRide: "14:00 - Sunset Trail"
    },
    {
      id: "H002",
      name: "Spirit",
      breed: "Arabian",
      age: 6,
      temperament: "Energetic",
      experience: "Intermediate",
      status: "on_ride",
      healthStatus: "good",
      lastCheckup: "2024-01-12",
      ridesToday: 1,
      maxRides: 3,
      specialties: ["Adventure Trails", "Mountain Rides"],
      nextRide: "Currently on ride"
    },
    {
      id: "H003",
      name: "Gentle Ben",
      breed: "Clydesdale",
      age: 12,
      temperament: "Very Calm",
      experience: "Beginner Friendly",
      status: "available",
      healthStatus: "excellent",
      lastCheckup: "2024-01-08",
      ridesToday: 1,
      maxRides: 3,
      specialties: ["Family Rides", "First-time Riders"],
      nextRide: "16:00 - Family Trail"
    },
    {
      id: "H004",
      name: "Storm",
      breed: "Mustang",
      age: 7,
      temperament: "Spirited",
      experience: "Advanced",
      status: "resting",
      healthStatus: "good",
      lastCheckup: "2024-01-11",
      ridesToday: 3,
      maxRides: 3,
      specialties: ["Adventure Rides", "Experienced Riders"],
      nextRide: "Rest day"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'on_ride':
        return <Badge className="bg-blue-100 text-blue-800">On Ride</Badge>;
      case 'resting':
        return <Badge className="bg-yellow-100 text-yellow-800">Resting</Badge>;
      case 'veterinary':
        return <Badge className="bg-red-100 text-red-800">Veterinary</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'fair':
        return <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>;
      case 'needs_attention':
        return <Badge className="bg-red-100 text-red-800">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">{health}</Badge>;
    }
  };

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 100) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredHorses = horses.filter(horse => {
    const matchesSearch = horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         horse.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || horse.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Horse Management</h2>
          <p className="text-muted-foreground">
            Manage horses, their health, availability, and riding schedules
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Horse
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
                  placeholder="Search by horse name or breed..."
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="on_ride">On Ride</SelectItem>
                <SelectItem value="resting">Resting</SelectItem>
                <SelectItem value="veterinary">Veterinary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Horses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHorses.map((horse) => (
          <Card key={horse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Horse className="h-5 w-5" />
                    {horse.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {horse.breed} • {horse.age} years old
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(horse.status)}
                    {getHealthBadge(horse.healthStatus)}
                  </div>
                </div>
                <Badge variant="outline">{horse.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Horse Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Temperament</p>
                  <p className="font-medium">{horse.temperament}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience Level</p>
                  <p className="font-medium">{horse.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Checkup</p>
                  <p className="font-medium">{horse.lastCheckup}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Next Ride</p>
                  <p className="font-medium text-sm">{horse.nextRide}</p>
                </div>
              </div>

              {/* Daily Workload */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Today's Workload</span>
                  <span className={`text-sm font-bold ${getWorkloadColor(horse.ridesToday, horse.maxRides)}`}>
                    {horse.ridesToday}/{horse.maxRides} rides
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(horse.ridesToday / horse.maxRides) * 100}%` }}
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {horse.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Schedule Ride
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Heart className="h-3 w-3" />
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
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {horses.filter(h => h.status === 'available').length}
              </p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {horses.filter(h => h.status === 'on_ride').length}
              </p>
              <p className="text-sm text-muted-foreground">On Rides</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {horses.filter(h => h.status === 'resting').length}
              </p>
              <p className="text-sm text-muted-foreground">Resting</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((horses.reduce((sum, h) => sum + h.ridesToday, 0) / horses.length * 10)) / 10}
              </p>
              <p className="text-sm text-muted-foreground">Avg Rides/Day</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HorseManagement;
