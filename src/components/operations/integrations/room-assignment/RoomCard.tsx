
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Warehouse, DollarSign, CheckCircle } from "lucide-react";

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    type: string;
    capacity: number;
    status: string;
    pricing: {
      dailyRate: number;
      weeklyRate: number;
      monthlyRate: number;
    };
    amenities: string[];
    size: string;
  };
}

const RoomCard = ({ room }: RoomCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Warehouse className="h-4 w-4" />
            {room.name}
          </CardTitle>
          <Badge className={getStatusColor(room.status)}>
            {room.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Type:</span>
          <span className="font-medium capitalize">{room.type}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Size:</span>
          <span className="font-medium capitalize">{room.size.replace('_', ' ')}</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-green-500" />
          <span className="font-medium">${room.pricing.dailyRate}/day</span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map(amenity => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity.replace('_', ' ')}
              </Badge>
            ))}
            {room.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.amenities.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {room.status === 'available' && (
          <div className="flex items-center gap-1 text-green-600 text-xs pt-2">
            <CheckCircle className="h-3 w-3" />
            Ready for assignment
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
