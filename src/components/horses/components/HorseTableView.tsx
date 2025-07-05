import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface HorseTableViewProps {
  horses: Horse[];
  onViewDetails: (horse: Horse) => void;
  onEdit: (horse: Horse) => void;
  clientId?: string | null;
}

const HorseTableView = ({ horses, onViewDetails, onEdit, clientId }: HorseTableViewProps) => {
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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Registration</TableHead>
            {!clientId && <TableHead>Owner</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {horses.map((horse) => (
            <TableRow key={horse.id} className="hover:bg-muted/50">
              <TableCell>
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={horse.image || `/placeholder-horse-${horse.id}.jpg`} 
                    alt={horse.name}
                  />
                  <AvatarFallback className={`text-sm font-semibold ${getHorseImagePlaceholder(horse)}`}>
                    {horse.name.charAt(0)}{horse.breed.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{horse.name}</TableCell>
              <TableCell>{horse.breed}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={`text-xs capitalize ${getGenderBadgeColor(horse.gender)}`}
                >
                  {horse.gender}
                </Badge>
              </TableCell>
              <TableCell>{horse.age} years</TableCell>
              <TableCell className="font-mono text-sm">{horse.registrationNumber}</TableCell>
              {!clientId && (
                <TableCell className="max-w-32 truncate" title={horse.owner}>
                  {horse.owner}
                </TableCell>
              )}
              <TableCell>
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
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewDetails(horse)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(horse)}
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HorseTableView; 