
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Calendar, Stethoscope } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Horse } from "@/types/horse-unified";

interface GeldingCardProps {
  gelding: Horse;
  onEdit: () => void;
  onScheduleCheckup: () => void;
  onViewMedicalRecords: () => void;
}

const GeldingCard = ({ gelding, onEdit, onScheduleCheckup, onViewMedicalRecords }: GeldingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'transferred': return 'bg-blue-100 text-blue-800';
      case 'deceased': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'under_treatment': return 'bg-yellow-100 text-yellow-800';
      case 'quarantine': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{gelding.name}</CardTitle>
            {gelding.arabicName && (
              <p className="text-sm text-muted-foreground">{gelding.arabicName}</p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onScheduleCheckup}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Checkup
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onViewMedicalRecords}>
                <Stethoscope className="mr-2 h-4 w-4" />
                Medical Records
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Age:</span> {calculateAge(gelding.birthDate)} years
            </div>
            <div>
              <span className="font-medium">Breed:</span> {gelding.breed}
            </div>
            <div>
              <span className="font-medium">Color:</span> {gelding.color}
            </div>
            <div>
              <span className="font-medium">Owner:</span> {gelding.ownerName}
            </div>
          </div>
          
          <div className="text-sm">
            <span className="font-medium">Location:</span> {gelding.currentLocation || 'Not specified'}
            {gelding.stallNumber && <span> - Stall {gelding.stallNumber}</span>}
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge className={getStatusColor(gelding.status)}>
              {gelding.status}
            </Badge>
            <Badge className={getHealthStatusColor(gelding.healthStatus)}>
              {gelding.healthStatus.replace('_', ' ')}
            </Badge>
          </div>

          {gelding.registrationNumber && (
            <div className="text-xs text-muted-foreground">
              Reg: {gelding.registrationNumber}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeldingCard;
