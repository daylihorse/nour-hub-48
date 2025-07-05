import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GridSize } from "./HorseViewSelector";

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: string;
  owner: string;
  ownerId: string;
  status: string;
  age: number;
  registrationNumber: string;
  image?: string;
}

interface HorseGridViewProps {
  horses: Horse[];
  onViewDetails: (horse: Horse) => void;
  onEdit: (horse: Horse) => void;
  clientId?: string | null;
  gridSize?: GridSize;
}

const HorseGridView = ({ horses, onViewDetails, onEdit, clientId, gridSize = 3 }: HorseGridViewProps) => {
  // Generate a placeholder horse image based on horse name and breed
  const getHorseImagePlaceholder = (horse: Horse) => {
    const colors = [
      "bg-amber-100 text-amber-700",
      "bg-emerald-100 text-emerald-700", 
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-rose-100 text-rose-700",
      "bg-indigo-100 text-indigo-700"
    ];
    const colorIndex = horse.name.length % colors.length;
    return colors[colorIndex];
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'stallion':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mare':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'gelding':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'filly':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'colt':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Dynamic grid columns based on gridSize
  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {horses.map((horse) => (
        <Card key={horse.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              {/* Horse Photo */}
              <Avatar className="h-16 w-16">
                <AvatarImage 
                  src={horse.image || `/placeholder-horse-${horse.id}.jpg`} 
                  alt={horse.name}
                />
                <AvatarFallback className={`text-lg font-semibold ${getHorseImagePlaceholder(horse)}`}>
                  {horse.name.charAt(0)}{horse.breed.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{horse.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={`text-xs capitalize ${getGenderBadgeColor(horse.gender)}`}
                >
                  {horse.gender}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Breed:</span>
                <span className="font-medium">{horse.breed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Age:</span>
                <span>{horse.age} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Registration:</span>
                <span className="font-mono text-xs">{horse.registrationNumber}</span>
              </div>
              {!clientId && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="truncate max-w-24" title={horse.owner}>{horse.owner}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs capitalize ${
                    horse.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {horse.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onViewDetails(horse)}
              >
                View Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onEdit(horse)}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HorseGridView; 