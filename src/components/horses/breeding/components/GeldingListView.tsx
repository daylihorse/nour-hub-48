
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Stethoscope, FileText } from "lucide-react";
import { Horse } from "@/types/horse-unified";

interface GeldingListViewProps {
  geldings: Horse[];
  onEditGelding: (geldingId: string) => void;
  onScheduleCheckup: (geldingId: string) => void;
  onViewMedicalRecords: (geldingId: string) => void;
}

const GeldingListView = ({
  geldings,
  onEditGelding,
  onScheduleCheckup,
  onViewMedicalRecords,
}: GeldingListViewProps) => {
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

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age;
  };

  if (geldings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No geldings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {geldings.map((gelding) => (
        <Card key={gelding.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{gelding.name}</h3>
                    {gelding.arabicName && (
                      <p className="text-sm text-gray-600 font-arabic">{gelding.arabicName}</p>
                    )}
                  </div>
                  <Badge className={getHealthStatusColor(gelding.healthStatus)}>
                    {gelding.healthStatus.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
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
                    <p className="font-medium">{gelding.ownerName}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditGelding(gelding.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onScheduleCheckup(gelding.id)}
                >
                  <Stethoscope className="h-4 w-4 mr-1" />
                  Checkup
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewMedicalRecords(gelding.id)}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GeldingListView;
