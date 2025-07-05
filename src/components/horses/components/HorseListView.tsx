import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface HorseListViewProps {
  horses: Horse[];
  onViewDetails: (horse: Horse) => void;
  onEdit: (horse: Horse) => void;
  clientId?: string | null;
}

const HorseListView = ({ horses, onViewDetails, onEdit, clientId }: HorseListViewProps) => {
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

  return (
    <div className="space-y-4">
      {horses.map((horse) => (
        <Card key={horse.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {/* Horse Photo */}
              <Avatar className="h-20 w-20 flex-shrink-0">
                <AvatarImage 
                  src={horse.image || `/placeholder-horse-${horse.id}.jpg`} 
                  alt={horse.name}
                />
                <AvatarFallback className={`text-lg font-semibold ${getHorseImagePlaceholder(horse)}`}>
                  {horse.name.charAt(0)}{horse.breed.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {/* Horse Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold truncate">{horse.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${getGenderBadgeColor(horse.gender)}`}
                  >
                    {horse.gender}
                  </Badge>
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
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Breed:</span>
                    <p className="font-medium">{horse.breed}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <p>{horse.age} years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Registration:</span>
                    <p className="font-mono text-xs">{horse.registrationNumber}</p>
                  </div>
                  {!clientId && (
                    <div>
                      <span className="text-muted-foreground">Owner:</span>
                      <p className="truncate" title={horse.owner}>{horse.owner}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(horse)}
                  className="w-24"
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(horse)}
                  className="w-24"
                >
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HorseListView; 