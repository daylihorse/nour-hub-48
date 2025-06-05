
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Baby, Stethoscope, Camera, FileText, AlertCircle } from "lucide-react";
import { PregnancyRecord } from "@/types/breeding";

interface PregnancyCardProps {
  pregnancy: PregnancyRecord;
  statusColor: string;
  onScheduleUltrasound: (pregnancyId: string) => void;
  onScheduleCheckup: (pregnancyId: string) => void;
}

const PregnancyCard = ({ pregnancy, statusColor, onScheduleUltrasound, onScheduleCheckup }: PregnancyCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const calculatePregnancyProgress = () => {
    const today = new Date();
    const breedingDate = new Date(pregnancy.breedingDate);
    const daysSinceBreeding = Math.floor((today.getTime() - breedingDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(Math.round((daysSinceBreeding / 340) * 100), 100);
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const dueDate = new Date(pregnancy.expectedDueDate);
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysRemaining;
  };

  const getCurrentGestationDay = () => {
    const today = new Date();
    const breedingDate = new Date(pregnancy.breedingDate);
    return Math.floor((today.getTime() - breedingDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const progress = calculatePregnancyProgress();
  const daysRemaining = getDaysRemaining();
  const gestationDay = getCurrentGestationDay();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Baby className="h-4 w-4" />
            Pregnancy {pregnancy.id}
          </CardTitle>
          <Badge variant={statusColor as any}>
            {pregnancy.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Mare: M{pregnancy.mareId.slice(-3)} • Stallion: S{pregnancy.stallionId?.slice(-3)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pregnancy Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Pregnancy Progress</span>
            <span className="text-sm font-bold">Day {gestationDay}/340</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Breeding: {formatDate(pregnancy.breedingDate)}</span>
            <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Due now'}</span>
          </div>
        </div>

        {/* Key Information */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Expected Due Date:</span>
            <span className="font-medium">{formatDate(pregnancy.expectedDueDate)}</span>
          </div>
          {pregnancy.actualDueDate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Actual Due Date:</span>
              <span className="font-medium">{formatDate(pregnancy.actualDueDate)}</span>
            </div>
          )}
        </div>

        {/* Medical Records Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Camera className="h-4 w-4 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-bold text-blue-600">{pregnancy.ultrasounds.length}</div>
            <p className="text-xs text-muted-foreground">Ultrasounds</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Stethoscope className="h-4 w-4 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold text-green-600">{pregnancy.checkups.length}</div>
            <p className="text-xs text-muted-foreground">Checkups</p>
          </div>
        </div>

        {/* Recent Activity */}
        {(pregnancy.ultrasounds.length > 0 || pregnancy.checkups.length > 0) && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Activity</h4>
            <div className="space-y-1">
              {pregnancy.ultrasounds.slice(-1).map((ultrasound) => (
                <div key={ultrasound.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Camera className="h-3 w-3" />
                  <span>Ultrasound - {formatDate(ultrasound.date)}</span>
                </div>
              ))}
              {pregnancy.checkups.slice(-1).map((checkup) => (
                <div key={checkup.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Stethoscope className="h-3 w-3" />
                  <span>Checkup - {formatDate(checkup.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {pregnancy.notes && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Notes:</span>
            </div>
            <p className="text-xs pl-5">{pregnancy.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center gap-1"
            onClick={() => onScheduleUltrasound(pregnancy.id)}
          >
            <Camera className="h-3 w-3" />
            Ultrasound
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center gap-1"
            onClick={() => onScheduleCheckup(pregnancy.id)}
          >
            <Stethoscope className="h-3 w-3" />
            Checkup
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PregnancyCard;
