
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Baby, Eye, Edit, Stethoscope, Activity } from "lucide-react";
import { PregnancyRecord } from "@/types/breeding";

interface PregnancyListViewProps {
  pregnancies: PregnancyRecord[];
  onScheduleUltrasound?: (pregnancyId: string) => void;
  onScheduleCheckup?: (pregnancyId: string) => void;
  onEditPregnancy?: (pregnancyId: string) => void;
}

const PregnancyListView = ({ 
  pregnancies, 
  onScheduleUltrasound, 
  onScheduleCheckup, 
  onEditPregnancy 
}: PregnancyListViewProps) => {
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
        {pregnancies.map((pregnancy, index) => (
          <div
            key={pregnancy.id}
            className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
              index !== pregnancies.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <Baby className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-slate-800">{pregnancy.id}</h3>
                  <p className="text-sm text-muted-foreground">Mare: {pregnancy.mareId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 flex-1">
                <Badge className={`${getStatusColor(pregnancy.status)} text-white`}>
                  {pregnancy.status.toUpperCase()}
                </Badge>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Breeding:</span>
                  <span className="ml-1 font-medium">{pregnancy.breedingDate.toLocaleDateString()}</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Due:</span>
                  <span className="ml-1 font-medium">{pregnancy.expectedDueDate.toLocaleDateString()}</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Ultrasounds:</span>
                  <span className="ml-1 font-medium text-blue-600">{pregnancy.ultrasounds.length}</span>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Checkups:</span>
                  <span className="ml-1 font-medium text-green-600">{pregnancy.checkups.length}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PregnancyListView;
