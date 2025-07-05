
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Stethoscope, FileText } from "lucide-react";
import { Horse } from "@/types/horse-unified";

interface GeldingTableViewProps {
  geldings: Horse[];
  onEditGelding: (geldingId: string) => void;
  onScheduleCheckup: (geldingId: string) => void;
  onViewMedicalRecords: (geldingId: string) => void;
}

const GeldingTableView = ({
  geldings,
  onEditGelding,
  onScheduleCheckup,
  onViewMedicalRecords,
}: GeldingTableViewProps) => {
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
    return today.getFullYear() - birth.getFullYear();
  };

  if (geldings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No geldings found</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Health Status</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {geldings.map((gelding) => (
            <TableRow key={gelding.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{gelding.name}</div>
                  {gelding.arabicName && (
                    <div className="text-sm text-gray-500 font-arabic">{gelding.arabicName}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>{gelding.breed}</TableCell>
              <TableCell>{calculateAge(gelding.birthDate)} years</TableCell>
              <TableCell>{gelding.color}</TableCell>
              <TableCell className="max-w-32 truncate">{gelding.ownerName}</TableCell>
              <TableCell>
                <Badge className={getHealthStatusColor(gelding.healthStatus)}>
                  {gelding.healthStatus.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                {gelding.insured ? (
                  <Badge variant="outline" className="text-green-700">
                    Insured
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">
                    Not Insured
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditGelding(gelding.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onScheduleCheckup(gelding.id)}
                  >
                    <Stethoscope className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewMedicalRecords(gelding.id)}
                  >
                    <FileText className="h-4 w-4" />
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

export default GeldingTableView;
