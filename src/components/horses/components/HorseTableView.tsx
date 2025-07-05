
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface HorseTableViewProps {
  onViewDetails?: (horseId: string) => void;
}

const HorseTableView = ({ onViewDetails }: HorseTableViewProps) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHorses.map((horse) => (
            <TableRow key={horse.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{horse.name}</div>
                  {horse.arabicName && (
                    <div className="text-sm text-muted-foreground" dir="rtl">
                      {horse.arabicName}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{horse.breed}</TableCell>
              <TableCell>
                <Badge className={getGenderColor(horse.gender)}>
                  {horse.gender}
                </Badge>
              </TableCell>
              <TableCell>
                <AgeDisplay birthDate={horse.birthDate} className="mt-0" />
              </TableCell>
              <TableCell>{horse.color}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(horse.status)}>
                  {horse.status}
                </Badge>
              </TableCell>
              <TableCell>{horse.ownerName}</TableCell>
              <TableCell className="font-mono text-xs">{horse.registrationNumber}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HorseTableView;
