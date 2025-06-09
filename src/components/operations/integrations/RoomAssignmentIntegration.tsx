
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Warehouse, Rabbit, Calendar, MapPin, Users } from "lucide-react";

interface Room {
  id: string;
  number: string;
  type: 'standard' | 'isolation' | 'recovery' | 'foaling' | 'quarantine';
  capacity: number;
  currentOccupants: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  features: string[];
  location: string;
  dailyRate: number;
}

interface HorseAssignment {
  id: string;
  horseName: string;
  ownerName: string;
  arrivalDate: Date;
  specialRequirements: string[];
  assignedRoomId?: string;
  status: 'pending' | 'assigned' | 'checked_in';
}

const RoomAssignmentIntegration = () => {
  const [selectedHorse, setSelectedHorse] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  // Mock data
  const rooms: Room[] = [
    {
      id: "R001",
      number: "101",
      type: "standard",
      capacity: 1,
      currentOccupants: 0,
      status: "available",
      features: ["Climate controlled", "Security camera"],
      location: "Building A",
      dailyRate: 45.00
    },
    {
      id: "R002",
      number: "102",
      type: "isolation",
      capacity: 1,
      currentOccupants: 1,
      status: "occupied",
      features: ["Isolation ventilation", "Separate entrance"],
      location: "Building B",
      dailyRate: 75.00
    },
    {
      id: "R003",
      number: "103",
      type: "recovery",
      capacity: 1,
      currentOccupants: 0,
      status: "available",
      features: ["Medical monitoring", "Soft flooring"],
      location: "Building A",
      dailyRate: 65.00
    },
    {
      id: "R004",
      number: "104",
      type: "foaling",
      capacity: 2,
      currentOccupants: 0,
      status: "available",
      features: ["24/7 monitoring", "Large space", "Foaling kit"],
      location: "Building C",
      dailyRate: 95.00
    }
  ];

  const horseAssignments: HorseAssignment[] = [
    {
      id: "HA001",
      horseName: "Thunder",
      ownerName: "John Doe",
      arrivalDate: new Date(),
      specialRequirements: ["Isolation required"],
      status: "pending"
    },
    {
      id: "HA002",
      horseName: "Star",
      ownerName: "Jane Smith",
      arrivalDate: new Date(Date.now() + 86400000),
      specialRequirements: ["Recovery monitoring"],
      status: "pending"
    },
    {
      id: "HA003",
      horseName: "Luna",
      ownerName: "Bob Johnson",
      arrivalDate: new Date(),
      specialRequirements: ["Foaling expected"],
      assignedRoomId: "R004",
      status: "assigned"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'occupied':
        return 'secondary';
      case 'maintenance':
        return 'destructive';
      case 'reserved':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'isolation':
        return 'text-red-600 bg-red-50';
      case 'recovery':
        return 'text-blue-600 bg-blue-50';
      case 'foaling':
        return 'text-purple-600 bg-purple-50';
      case 'quarantine':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleAssignRoom = () => {
    if (selectedHorse && selectedRoom) {
      console.log(`Assigning horse ${selectedHorse} to room ${selectedRoom}`);
      // In a real implementation, this would call an API
    }
  };

  const getRecommendedRooms = (requirements: string[]) => {
    return rooms.filter(room => {
      if (room.status !== 'available') return false;
      
      return requirements.some(req => {
        if (req.includes('Isolation') && room.type === 'isolation') return true;
        if (req.includes('Recovery') && room.type === 'recovery') return true;
        if (req.includes('Foaling') && room.type === 'foaling') return true;
        return room.type === 'standard';
      });
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Room Assignment Integration</h2>
        <p className="text-muted-foreground">
          Automated room assignment based on horse requirements and room availability
        </p>
      </div>

      {/* Room Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Total Rooms</p>
                <p className="text-lg font-bold">{rooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold">
                  {rooms.filter(r => r.status === 'available').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Rabbit className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Occupied</p>
                <p className="text-lg font-bold">
                  {rooms.filter(r => r.status === 'occupied').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Pending Assignments</p>
                <p className="text-lg font-bold">
                  {horseAssignments.filter(h => h.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Room Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Horse</Label>
              <Select value={selectedHorse} onValueChange={setSelectedHorse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a horse to assign" />
                </SelectTrigger>
                <SelectContent>
                  {horseAssignments
                    .filter(h => h.status === 'pending')
                    .map(horse => (
                      <SelectItem key={horse.id} value={horse.id}>
                        {horse.horseName} - {horse.ownerName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Room</Label>
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an available room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms
                    .filter(r => r.status === 'available')
                    .map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        Room {room.number} - {room.type} (${room.dailyRate}/day)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAssignRoom}
            disabled={!selectedHorse || !selectedRoom}
            className="w-full"
          >
            Assign Room
          </Button>
        </CardContent>
      </Card>

      {/* Pending Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Horse Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {horseAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{assignment.horseName}</h4>
                    <p className="text-sm text-muted-foreground">Owner: {assignment.ownerName}</p>
                  </div>
                  <Badge variant={assignment.status === 'assigned' ? 'default' : 'outline'}>
                    {assignment.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Arrival: {assignment.arrivalDate.toLocaleDateString()}
                  </div>
                  {assignment.assignedRoomId && (
                    <div className="flex items-center gap-1">
                      <Warehouse className="h-3 w-3" />
                      Room: {rooms.find(r => r.id === assignment.assignedRoomId)?.number}
                    </div>
                  )}
                </div>

                {assignment.specialRequirements.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium mb-1">Special Requirements:</p>
                    <div className="flex gap-1">
                      {assignment.specialRequirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {assignment.status === 'pending' && (
                  <div>
                    <p className="text-xs font-medium mb-2">Recommended Rooms:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {getRecommendedRooms(assignment.specialRequirements).map((room) => (
                        <div key={room.id} className="p-2 border rounded text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Room {room.number}</span>
                            <Badge className={getRoomTypeColor(room.type)}>
                              {room.type}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">${room.dailyRate}/day</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Room Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Room Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Room {room.number}</h4>
                    <p className="text-sm text-muted-foreground">{room.location}</p>
                  </div>
                  <Badge variant={getStatusColor(room.status) as any}>
                    {room.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <Badge className={getRoomTypeColor(room.type)}>
                      {room.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Occupancy:</span>
                    <span>{room.currentOccupants}/{room.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>
                    <span>${room.dailyRate}</span>
                  </div>
                </div>

                {room.features.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomAssignmentIntegration;
