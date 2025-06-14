
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Activity, Stethoscope } from "lucide-react";
import { PregnancyRecord } from "@/types/breeding";

interface PregnancyTableViewProps {
  pregnancies: PregnancyRecord[];
  onScheduleUltrasound?: (pregnancyId: string) => void;
  onScheduleCheckup?: (pregnancyId: string) => void;
  onEditPregnancy?: (pregnancyId: string) => void;
}

const PregnancyTableView = ({ 
  pregnancies, 
  onScheduleUltrasound, 
  onScheduleCheckup, 
  onEditPregnancy 
}: PregnancyTableViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "monitoring": return "bg-yellow-500";
      case "delivered": return "bg-blue-500";
      case "lost": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleScheduleUltrasound = (pregnancyId: string) => {
    if (onScheduleUltrasound) {
      onScheduleUltrasound(pregnancyId);
    } else {
      console.log('Schedule ultrasound for pregnancy:', pregnancyId);
    }
  };

  const handleScheduleCheckup = (pregnancyId: string) => {
    if (onScheduleCheckup) {
      onScheduleCheckup(pregnancyId);
    } else {
      console.log('Schedule checkup for pregnancy:', pregnancyId);
    }
  };

  const handleEditPregnancy = (pregnancyId: string) => {
    if (onEditPregnancy) {
      onEditPregnancy(pregnancyId);
    } else {
      console.log('Edit pregnancy:', pregnancyId);
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Pregnancy ID</th>
                <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                <th className="text-left p-4 font-semibold text-slate-700">Mare</th>
                <th className="text-left p-4 font-semibold text-slate-700">Stallion</th>
                <th className="text-left p-4 font-semibold text-slate-700">Breeding Date</th>
                <th className="text-left p-4 font-semibold text-slate-700">Due Date</th>
                <th className="text-left p-4 font-semibold text-slate-700">Records</th>
                <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pregnancies.map((pregnancy, index) => (
                <tr
                  key={pregnancy.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index !== pregnancies.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{pregnancy.id}</div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getStatusColor(pregnancy.status)} text-white`}>
                      {pregnancy.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-700">{pregnancy.mareId}</td>
                  <td className="p-4 text-slate-700">{pregnancy.stallionId}</td>
                  <td className="p-4 text-slate-700">{pregnancy.breedingDate.toLocaleDateString()}</td>
                  <td className="p-4 text-slate-700">{pregnancy.expectedDueDate.toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-blue-600">{pregnancy.ultrasounds.length} Ultrasounds</div>
                      <div className="text-green-600">{pregnancy.checkups.length} Checkups</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => console.log('View details:', pregnancy.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPregnancy(pregnancy.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScheduleUltrasound(pregnancy.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Activity className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScheduleCheckup(pregnancy.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Stethoscope className="h-3 w-3" />
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

export default PregnancyTableView;
