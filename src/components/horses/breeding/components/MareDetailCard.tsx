
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mare } from "@/types/breeding/mare";
import { Calendar, Heart, Activity, Edit, Stethoscope, FileText } from "lucide-react";

interface MareDetailCardProps {
  mare: Mare;
  onViewDetails: (mareId: string) => void;
  onEditMare: (mareId: string) => void;
  onScheduleCheckup: (mareId: string) => void;
  onViewMedicalRecords: (mareId: string) => void;
}

const MareDetailCard = ({ 
  mare, 
  onViewDetails, 
  onEditMare, 
  onScheduleCheckup, 
  onViewMedicalRecords 
}: MareDetailCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pregnant': return 'bg-blue-500';
      case 'nursing': return 'bg-green-500';
      case 'open': return 'bg-yellow-500';
      case 'bred': return 'bg-purple-500';
      case 'retired': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{mare.horseName}</CardTitle>
            <p className="text-sm text-muted-foreground">{mare.breed} • {mare.age} years • ID: {mare.horseId}</p>
          </div>
          <Badge className={getStatusColor(mare.status)}>
            {mare.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span>Total Foals: {mare.totalFoals} (Live: {mare.liveFoals})</span>
          </div>
          
          {mare.expectedDueDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Due: {new Date(mare.expectedDueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {mare.stallionName && (
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span>Sire: {mare.stallionName}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onViewDetails(mare.id)}>
            View Details
          </Button>
          <Button size="sm" variant="outline" onClick={() => onEditMare(mare.id)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onScheduleCheckup(mare.id)}>
            <Stethoscope className="h-3 w-3 mr-1" />
            Checkup
          </Button>
          <Button size="sm" variant="outline" onClick={() => onViewMedicalRecords(mare.id)}>
            <FileText className="h-3 w-3 mr-1" />
            Records
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareDetailCard;
