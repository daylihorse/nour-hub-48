
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Warehouse, 
  Rabbit, 
  Package, 
  DollarSign, 
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  FileText
} from "lucide-react";
import { Room, Assignment } from "@/types/stableRooms";

interface RoomAssignmentIntegrationProps {
  onAssignRoom?: (roomId: string, entityId: string, entityType: string) => void;
}

const RoomAssignmentIntegration = ({ onAssignRoom }: RoomAssignmentIntegrationProps) => {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedHorse, setSelectedHorse] = useState<string>('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  // Mock data
  const availableRooms: Room[] = [
    {
      id: '1',
      number: 'A101',
      name: 'Premium Stall A101',
      type: 'stall',
      status: 'available',
      capacity: 1,
      currentOccupancy: 0,
      size: { length: 12, width: 12, unit: 'ft' },
      location: { building: 'Building A', section: 'North Wing' },
      features: ['climate_controlled', 'automatic_waterer', 'premium_bedding'],
      amenities: ['hay_rack', 'feed_bin', 'salt_lick_holder'],
      pricing: { dailyRate: 50, monthlyRate: 1200, currency: 'USD' },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      number: 'B205',
      name: 'Standard Stall B205',
      type: 'stall',
      status: 'available',
      capacity: 1,
      currentOccupancy: 0,
      size: { length: 10, width: 10, unit: 'ft' },
      location: { building: 'Building B', section: 'South Wing' },
      features: ['natural_ventilation', 'automatic_waterer'],
      amenities: ['hay_rack', 'feed_bin'],
      pricing: { dailyRate: 35, monthlyRate: 850, currency: 'USD' },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      number: 'C301',
      name: 'Medical Stall C301',
      type: 'quarantine',
      status: 'available',
      capacity: 1,
      currentOccupancy: 0,
      size: { length: 14, width: 12, unit: 'ft' },
      location: { building: 'Medical Center', section: 'Isolation Wing' },
      features: ['medical_equipment', 'isolation_ventilation', 'monitoring_cameras'],
      amenities: ['medical_feed_system', 'emergency_alert'],
      pricing: { dailyRate: 75, monthlyRate: 1800, currency: 'USD' },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const awaitingAssignment = [
    {
      id: '1',
      name: 'Thunder',
      type: 'horse',
      owner: 'John Smith',
      arrivalDate: new Date('2024-01-28'),
      specialRequirements: ['medical_monitoring', 'premium_feed'],
      priority: 'high'
    },
    {
      id: '2',
      name: 'Lightning',
      type: 'horse',
      owner: 'Sarah Johnson',
      arrivalDate: new Date('2024-01-29'),
      specialRequirements: ['standard_care'],
      priority: 'normal'
    }
  ];

  const getRecommendedRoom = (horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    if (!horse) return null;

    if (horse.specialRequirements.includes('medical_monitoring')) {
      return availableRooms.find(r => r.type === 'quarantine');
    }
    if (horse.specialRequirements.includes('premium_feed')) {
      return availableRooms.find(r => r.features.includes('climate_controlled'));
    }
    return availableRooms.find(r => r.type === 'stall' && r.status === 'available');
  };

  const calculateCosts = (roomId: string, duration: number = 30) => {
    const room = availableRooms.find(r => r.id === roomId);
    if (!room?.pricing) return { daily: 0, monthly: 0, estimated: 0 };
    
    return {
      daily: room.pricing.dailyRate,
      monthly: room.pricing.monthlyRate,
      estimated: room.pricing.dailyRate * duration
    };
  };

  const handleRoomAssignment = () => {
    if (selectedRoom && selectedHorse && onAssignRoom) {
      onAssignRoom(selectedRoom, selectedHorse, 'horse');
      setIsAssignDialogOpen(false);
      setSelectedRoom('');
      setSelectedHorse('');
    }
  };

  const setupSuppliesForRoom = (roomId: string, horseId: string) => {
    const horse = awaitingAssignment.find(h => h.id === horseId);
    const room = availableRooms.find(r => r.id === roomId);
    
    console.log(`Setting up supplies for ${horse?.name} in room ${room?.number}`);
    // This would integrate with inventory system to allocate supplies
  };

  const createBillingAccount = (roomId: string, horseId: string) => {
    const costs = calculateCosts(roomId);
    console.log(`Creating billing account with daily rate: $${costs.daily}`);
    // This would integrate with finance system
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Room Assignment Integration</h2>
        <p className="text-muted-foreground">
          Intelligent room assignment with automated supply and billing setup
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Available Rooms</p>
                <p className="text-xl font-bold">{availableRooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Awaiting Assignment</p>
                <p className="text-xl font-bold">{awaitingAssignment.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Daily Rate</p>
                <p className="text-xl font-bold">
                  ${Math.round(availableRooms.reduce((sum, r) => sum + (r.pricing?.dailyRate || 0), 0) / availableRooms.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Ready for Assignment</p>
                <p className="text-xl font-bold">
                  {availableRooms.filter(r => r.status === 'available').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Awaiting Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Horses Awaiting Room Assignment</span>
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Warehouse className="w-4 h-4 mr-2" />
                  Assign Room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Room Assignment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Select Horse</label>
                    <Select value={selectedHorse} onValueChange={setSelectedHorse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose horse..." />
                      </SelectTrigger>
                      <SelectContent>
                        {awaitingAssignment.map(horse => (
                          <SelectItem key={horse.id} value={horse.id}>
                            {horse.name} - {horse.owner}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Select Room</label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose room..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRooms.map(room => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.number} - {room.name} (${room.pricing?.dailyRate}/day)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRoom && selectedHorse && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Assignment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Daily Rate:</span>
                          <span>${calculateCosts(selectedRoom).daily}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Rate:</span>
                          <span>${calculateCosts(selectedRoom).monthly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. 30-day Cost:</span>
                          <span>${calculateCosts(selectedRoom).estimated}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={handleRoomAssignment}
                        >
                          Assign Room & Setup Integration
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setupSuppliesForRoom(selectedRoom, selectedHorse)}
                          >
                            Setup Supplies
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => createBillingAccount(selectedRoom, selectedHorse)}
                          >
                            Create Billing
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {awaitingAssignment.map(horse => {
              const recommendedRoom = getRecommendedRoom(horse.id);
              return (
                <div key={horse.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Rabbit className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-medium">{horse.name}</h4>
                        <p className="text-sm text-muted-foreground">Owner: {horse.owner}</p>
                        <p className="text-sm text-muted-foreground">
                          Arrival: {horse.arrivalDate.toLocaleDateString()}
                        </p>
                        <div className="flex gap-1 mt-2">
                          {horse.specialRequirements.map(req => (
                            <Badge key={req} variant="outline" className="text-xs">
                              {req.replace('_', ' ')}
                            </Badge>
                          ))}
                          <Badge 
                            variant={horse.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {horse.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {recommendedRoom && (
                        <div className="p-3 bg-green-50 rounded-lg mb-2">
                          <p className="text-sm font-medium text-green-800">
                            Recommended: {recommendedRoom.number}
                          </p>
                          <p className="text-xs text-green-600">
                            ${recommendedRoom.pricing?.dailyRate}/day
                          </p>
                        </div>
                      )}
                      <Button 
                        size="sm" 
                        onClick={() => {
                          setSelectedHorse(horse.id);
                          if (recommendedRoom) setSelectedRoom(recommendedRoom.id);
                          setIsAssignDialogOpen(true);
                        }}
                      >
                        Assign Room
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Rooms */}
      <Card>
        <CardHeader>
          <CardTitle>Available Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRooms.map(room => (
              <div key={room.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{room.number}</h4>
                    <p className="text-sm text-muted-foreground">{room.name}</p>
                  </div>
                  <Badge 
                    variant={room.type === 'quarantine' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {room.type}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>{room.location.building} - {room.location.section}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3" />
                    <span>${room.pricing?.dailyRate}/day</span>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {room.features.slice(0, 2).map(feature => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature.replace('_', ' ')}
                      </Badge>
                    ))}
                    {room.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{room.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomAssignmentIntegration;
