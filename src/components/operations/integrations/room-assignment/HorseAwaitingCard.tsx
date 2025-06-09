
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Clock } from "lucide-react";

interface HorseAwaitingCardProps {
  horse: {
    id: string;
    name: string;
    breed: string;
    age: number;
    specialNeeds: string[];
    currentLocation: string;
  };
  recommendedRoom: any;
  onAssignRoom: (horseId: string, roomId?: string) => void;
}

const HorseAwaitingCard = ({ horse, recommendedRoom, onAssignRoom }: HorseAwaitingCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-blue-500" />
            <div>
              <h4 className="font-medium">{horse.name}</h4>
              <p className="text-sm text-muted-foreground">
                {horse.breed} • {horse.age} years old
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{horse.currentLocation}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {horse.specialNeeds.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {horse.specialNeeds.slice(0, 2).map(need => (
                  <Badge key={need} variant="outline" className="text-xs">
                    {need.replace('_', ' ')}
                  </Badge>
                ))}
                {horse.specialNeeds.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{horse.specialNeeds.length - 2}
                  </Badge>
                )}
              </div>
            )}
            
            <div className="text-right">
              {recommendedRoom && (
                <p className="text-xs text-muted-foreground mb-1">
                  Recommended: {recommendedRoom.name}
                </p>
              )}
              <Button 
                size="sm"
                onClick={() => onAssignRoom(horse.id, recommendedRoom?.id)}
              >
                <Clock className="h-3 w-3 mr-1" />
                Assign Room
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorseAwaitingCard;
