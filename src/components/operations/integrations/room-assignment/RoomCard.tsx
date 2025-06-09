
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign } from "lucide-react";
import { Room } from "@/types/stableRooms";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div className="p-4 border rounded-lg">
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
  );
};

export default RoomCard;
