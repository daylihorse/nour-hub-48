
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Stethoscope, FileText, Calendar } from "lucide-react";
import { Horse } from "@/types/horse";

interface GeldingCardProps {
  gelding: Horse;
  onEdit: () => void;
  onScheduleCheckup: () => void;
  onViewMedicalRecords: () => void;
}

const GeldingCard = ({
  gelding,
  onEdit,
  onScheduleCheckup,
  onViewMedicalRecords,
}: GeldingCardProps) => {
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "under_treatment":
        return "bg-yellow-100 text-yellow-800";
      case "quarantine":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{gelding.name}</h3>
            {gelding.arabicName && (
              <p className="text-sm text-gray-600 font-arabic">{gelding.arabicName}</p>
            )}
          </div>
          <Badge className={getHealthStatusColor(gelding.healthStatus)}>
            {gelding.healthStatus.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Breed:</span>
            <p className="font-medium">{gelding.breed}</p>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <p className="font-medium">{calculateAge(gelding.birthDate)} years</p>
          </div>
          <div>
            <span className="text-gray-500">Color:</span>
            <p className="font-medium">{gelding.color}</p>
          </div>
          <div>
            <span className="text-gray-500">Owner:</span>
            <p className="font-medium text-xs">{gelding.ownerName}</p>
          </div>
        </div>

        {gelding.insured && (
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
            <span className="text-xs text-blue-700">Insured</span>
            <span className="text-xs font-medium text-blue-800">
              {gelding.insuranceValue ? `$${gelding.insuranceValue.toLocaleString()}` : 'N/A'}
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onScheduleCheckup}
            className="flex-1"
          >
            <Stethoscope className="h-3 w-3 mr-1" />
            Checkup
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewMedicalRecords}
          >
            <FileText className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeldingCard;
