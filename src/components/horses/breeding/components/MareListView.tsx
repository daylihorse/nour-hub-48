
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Baby, Heart, Activity, Eye, Edit, FileText, Stethoscope } from "lucide-react";
import { Mare } from "@/types/breeding/mare";

interface MareListViewProps {
  mares: Mare[];
  onEditMare?: (mareId: string) => void;
  onScheduleCheckup?: (mareId: string) => void;
  onViewMedicalRecords?: (mareId: string) => void;
}

const MareListView = ({ 
  mares, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords 
}: MareListViewProps) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pregnant": return <Baby className="h-4 w-4" />;
      case "nursing": return <Heart className="h-4 w-4" />;
      case "open": return <Calendar className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
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
        {mares.map((mare, index) => (
          <div
            key={mare.id}
            className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
              index !== mares.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                {getStatusIcon(mare.status)}
                <div>
                  <h3 className="font-semibold text-slate-800">{mare.horseName}</h3>
                  <p className="text-sm text-muted-foreground">ID: {mare.horseId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 flex-1">
                <Badge className={`${getStatusColor(mare.status)} text-white`}>
                  {mare.status.toUpperCase()}
                </Badge>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Breed:</span>
                  <span className="ml-1 font-medium">{mare.breed}</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="ml-1 font-medium">{mare.age}y</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Foals:</span>
                  <span className="ml-1 font-medium text-blue-600">{mare.totalFoals}</span>
                </div>

                {mare.status === "pregnant" && mare.pregnancyDay > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Day:</span>
                    <span className="ml-1 font-medium text-blue-600">{mare.pregnancyDay}/340</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
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
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MareListView;
