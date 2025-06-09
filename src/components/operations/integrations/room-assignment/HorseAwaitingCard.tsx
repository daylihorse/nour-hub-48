
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rabbit } from "lucide-react";
import { HorseAwaitingAssignment } from "@/hooks/useRoomAssignment";
import { Room } from "@/types/stableRooms";

interface HorseAwaitingCardProps {
  horse: HorseAwaitingAssignment;
  recommendedRoom?: Room | null;
  onAssignRoom: (horseId: string, recommendedRoomId?: string) => void;
}

const HorseAwaitingCard = ({ horse, recommendedRoom, onAssignRoom }: HorseAwaitingCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
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
              onClick={() => onAssignRoom(horse.id, recommendedRoom?.id)}
            >
              Assign Room
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorseAwaitingCard;
