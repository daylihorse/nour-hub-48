
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Baby, Heart, Activity, Eye, Edit, FileText, Stethoscope } from "lucide-react";

interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}

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

  const calculateProgress = () => {
    if (mare.status === "pregnant" && mare.pregnancyDay > 0) {
      return Math.round((mare.pregnancyDay / 340) * 100);
    }
    return 0;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">{mare.horseName}</CardTitle>
            <p className="text-sm text-muted-foreground">ID: {mare.horseId}</p>
          </div>
          <Badge className={`${getStatusColor(mare.status)} text-white flex items-center gap-1`}>
            {getStatusIcon(mare.status)}
            {mare.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Breed:</span>
            <p className="font-semibold">{mare.breed}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Age:</span>
            <p className="font-semibold">{mare.age} years</p>
          </div>
          <div>
            <span className="text-muted-foreground">Total Foals:</span>
            <p className="font-semibold text-blue-600">{mare.totalFoals}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Live Foals:</span>
            <p className="font-semibold text-green-600">{mare.liveFoals}</p>
          </div>
        </div>

        {/* Pregnancy Progress */}
        {mare.status === "pregnant" && mare.pregnancyDay > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pregnancy Progress:</span>
              <span className="font-semibold">Day {mare.pregnancyDay}/340</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            {mare.expectedDueDate && (
              <p className="text-sm text-muted-foreground">
                Due: {new Date(mare.expectedDueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Status-specific info */}
        {mare.status === "nursing" && mare.foalBirthDate && (
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-purple-800">
              Foal born: {new Date(mare.foalBirthDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {mare.status === "open" && mare.nextHeat && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-800">
              Next heat: {new Date(mare.nextHeat).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(mare.id)}
            className="flex items-center gap-1"
          >
            <Eye className="h-3 w-3" />
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEditMare(mare.id)}
            className="flex items-center gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onScheduleCheckup(mare.id)}
            className="flex items-center gap-1"
          >
            <Stethoscope className="h-3 w-3" />
            Checkup
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewMedicalRecords(mare.id)}
            className="flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            Medical
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MareDetailCard;
