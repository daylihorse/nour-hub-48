
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AgeDisplay from "../form-components/AgeDisplay";

// Mock data - in a real app, this would come from your data store
const mockHorses = [
  {
    id: "1",
    name: "Thunder Storm",
    arabicName: "عاصفة الرعد",
    breed: "Arabian",
    gender: "stallion",
    birthDate: "2018-05-15",
    color: "Bay",
    status: "active",
    ownerName: "Elite Equestrian Center",
    registrationNumber: "AHR-2018-001234"
  },
  {
    id: "2",
    name: "Midnight Grace",
    arabicName: "نعمة منتصف الليل",
    breed: "Arabian",
    gender: "mare",
    birthDate: "2019-03-22",
    color: "Black",
    status: "active",
    ownerName: "Desert Winds Stables",
    registrationNumber: "AHR-2019-005678"
  },
  {
    id: "3",
    name: "Golden Spirit",
    breed: "Thoroughbred",
    gender: "gelding",
    birthDate: "2017-08-10",
    color: "Chestnut",
    status: "active",
    ownerName: "Sunrise Ranch",
    registrationNumber: "THB-2017-009876"
  }
];

interface HorseGridViewProps {
  onViewDetails?: (horseId: string) => void;
}

const HorseGridView = ({ onViewDetails }: HorseGridViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'transferred':
        return 'bg-blue-100 text-blue-800';
      case 'deceased':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'stallion':
        return 'bg-blue-100 text-blue-800';
      case 'mare':
        return 'bg-purple-100 text-purple-800';
      case 'gelding':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockHorses.map((horse) => (
        <Card key={horse.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">{horse.name}</CardTitle>
                {horse.arabicName && (
                  <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                    {horse.arabicName}
                  </p>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails?.(horse.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(horse.status)}>
                {horse.status}
              </Badge>
              <Badge className={getGenderColor(horse.gender)}>
                {horse.gender}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Breed:</span>
                <p>{horse.breed}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Color:</span>
                <p>{horse.color}</p>
              </div>
            </div>
            
            <div>
              <span className="font-medium text-muted-foreground text-sm">Age:</span>
              <AgeDisplay birthDate={horse.birthDate} className="mt-1" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium text-muted-foreground">Owner:</span> {horse.ownerName}
              </p>
              <p className="text-sm">
                <span className="font-medium text-muted-foreground">Registration:</span> {horse.registrationNumber}
              </p>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Button 
                size="sm" 
                onClick={() => onViewDetails?.(horse.id)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
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
