
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Info, 
  Edit, 
  Calendar, 
  Users, 
  MapPin, 
  Thermometer,
  Wifi,
  Shield,
  DollarSign,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Room } from "@/types/stableRooms";

interface RoomDetailsPanelProps {
  room: Room | null;
  onEdit?: (room: Room) => void;
  onAssign?: (room: Room) => void;
  onMaintenance?: (room: Room) => void;
}

const RoomDetailsPanel = ({ room, onEdit, onAssign, onMaintenance }: RoomDetailsPanelProps) => {
  if (!room) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Info className="h-12 w-12" />
            <p className="text-lg font-medium">No Room Selected</p>
            <p className="text-sm">Click on a room in the floor plan to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'occupied': return 'text-blue-600 bg-blue-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'reserved': return 'text-purple-600 bg-purple-100';
      case 'out_of_order': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOccupancyPercentage = () => {
    return (room.currentOccupancy / room.capacity) * 100;
  };

  const getRoomArea = () => {
    return (room.size.length * room.size.width).toFixed(1);
  };

  const getMaintenanceStatus = () => {
    // Mock maintenance data
    const lastMaintenance = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const nextMaintenance = new Date(Date.now() + 23 * 24 * 60 * 60 * 1000);
    
    return {
      lastMaintenance,
      nextMaintenance,
      daysUntilNext: Math.ceil((nextMaintenance.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    };
  };

  const maintenance = getMaintenanceStatus();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {room.number}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{room.name}</p>
          </div>
          <Badge className={getStatusColor(room.status)}>
            {room.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div>
          <h4 className="font-medium mb-3">Basic Information</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <p className="font-medium capitalize">{room.type.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Building:</span>
              <p className="font-medium">{room.location.building}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Section:</span>
              <p className="font-medium">{room.location.section}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Area:</span>
              <p className="font-medium">{getRoomArea()} {room.size.unit}²</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Occupancy */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Occupancy
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current / Capacity</span>
              <span>{room.currentOccupancy} / {room.capacity}</span>
            </div>
            <Progress value={getOccupancyPercentage()} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {getOccupancyPercentage().toFixed(0)}% occupied
            </p>
          </div>
        </div>

        {/* Assignment Info */}
        {room.assignedTo && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-3">Current Assignment</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Assigned to:</span>
                  <p className="font-medium">{room.assignedTo.entityName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium capitalize">{room.assignedTo.type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Since:</span>
                  <p className="font-medium">{room.assignedTo.assignedDate.toLocaleDateString()}</p>
                </div>
                {room.assignedTo.expectedVacate && (
                  <div>
                    <span className="text-muted-foreground">Expected vacate:</span>
                    <p className="font-medium">{room.assignedTo.expectedVacate.toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Features & Amenities */}
        <div>
          <h4 className="font-medium mb-3">Features & Amenities</h4>
          <div className="space-y-3">
            {room.features.length > 0 && (
              <div>
                <span className="text-sm text-muted-foreground">Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {room.amenities.length > 0 && (
              <div>
                <span className="text-sm text-muted-foreground">Amenities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Wifi className="h-3 w-3 mr-1" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        {room.pricing && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Daily Rate:</span>
                  <p className="font-medium">${room.pricing.dailyRate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Monthly Rate:</span>
                  <p className="font-medium">${room.pricing.monthlyRate}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Maintenance */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Maintenance
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last check:</span>
              <span>{maintenance.lastMaintenance.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next check:</span>
              <div className="flex items-center gap-1">
                {maintenance.daysUntilNext <= 7 && (
                  <AlertTriangle className="h-3 w-3 text-orange-500" />
                )}
                <span>{maintenance.nextMaintenance.toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {maintenance.daysUntilNext} days until next maintenance
            </p>
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit?.(room)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onAssign?.(room)}
              disabled={room.status === 'occupied'}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Assign
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onMaintenance?.(room)}
            >
              <Clock className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button size="sm" variant="outline">
              <Thermometer className="h-4 w-4 mr-1" />
              History
            </Button>
          </div>
        </div>

        {/* Timestamps */}
        <div className="pt-2 border-t text-xs text-muted-foreground">
          <p>Created: {room.createdAt.toLocaleDateString()}</p>
          <p>Updated: {room.updatedAt.toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetailsPanel;
