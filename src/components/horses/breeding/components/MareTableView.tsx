
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, FileText, Stethoscope } from "lucide-react";
import { Mare } from "@/types/breeding/mare";

interface MareTableViewProps {
  mares: Mare[];
  onEditMare?: (mareId: string) => void;
  onScheduleCheckup?: (mareId: string) => void;
  onViewMedicalRecords?: (mareId: string) => void;
}

const MareTableView = ({ 
  mares, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords 
}: MareTableViewProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pregnant": return "bg-blue-500";
      case "open": return "bg-green-500";
      case "nursing": return "bg-purple-500";
      case "bred": return "bg-orange-500";
      case "retired": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const handleViewDetails = (mareId: string) => {
    navigate(`/dashboard/horses/breeding/mares/${mareId}`);
  };

  const handleEditMare = (mareId: string) => {
    if (onEditMare) {
      onEditMare(mareId);
    } else {
      console.log('Edit mare:', mareId);
    }
  };

  const handleScheduleCheckup = (mareId: string) => {
    if (onScheduleCheckup) {
      onScheduleCheckup(mareId);
    } else {
      console.log('Schedule checkup for mare:', mareId);
    }
  };

  const handleViewMedicalRecords = (mareId: string) => {
    if (onViewMedicalRecords) {
      onViewMedicalRecords(mareId);
    } else {
      console.log('View medical records for mare:', mareId);
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Mare</th>
                <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                <th className="text-left p-4 font-semibold text-slate-700">Breed</th>
                <th className="text-left p-4 font-semibold text-slate-700">Age</th>
                <th className="text-left p-4 font-semibold text-slate-700">Foals</th>
                <th className="text-left p-4 font-semibold text-slate-700">Current Info</th>
                <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mares.map((mare, index) => (
                <tr
                  key={mare.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index !== mares.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-slate-800">{mare.horseName}</div>
                      <div className="text-sm text-muted-foreground">ID: {mare.horseId}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getStatusColor(mare.status)} text-white`}>
                      {mare.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-700">{mare.breed}</td>
                  <td className="p-4 text-slate-700">{mare.age} years</td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium text-blue-600">{mare.totalFoals} Total</div>
                      <div className="text-green-600">{mare.liveFoals} Live</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {mare.status === "pregnant" && mare.pregnancyDay > 0 && (
                        <>
                          <div className="font-medium">Day {mare.pregnancyDay}/340</div>
                          {mare.expectedDueDate && (
                            <div className="text-muted-foreground">
                              Due: {new Date(mare.expectedDueDate).toLocaleDateString()}
                            </div>
                          )}
                        </>
                      )}
                      {mare.status === "nursing" && mare.foalBirthDate && (
                        <div className="font-medium text-purple-600">
                          Foal: {new Date(mare.foalBirthDate).toLocaleDateString()}
                        </div>
                      )}
                      {mare.status === "open" && mare.nextHeat && (
                        <div className="font-medium text-green-600">
                          Next heat: {new Date(mare.nextHeat).toLocaleDateString()}
                        </div>
                      )}
                      {mare.stallionName && (
                        <div className="text-muted-foreground">
                          Stallion: {mare.stallionName}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(mare.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditMare(mare.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScheduleCheckup(mare.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Stethoscope className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMedicalRecords(mare.id)}
                        className="h-8 w-8 p-0"
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareTableView;
