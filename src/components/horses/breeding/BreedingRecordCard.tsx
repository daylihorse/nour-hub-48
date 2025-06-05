
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, DollarSign, User, FileText, Edit, Trash2 } from "lucide-react";
import { BreedingRecord } from "@/types/breeding";

interface BreedingRecordCardProps {
  record: BreedingRecord;
  statusColor: string;
  typeIcon: React.ReactNode;
}

const BreedingRecordCard = ({ record, statusColor, typeIcon }: BreedingRecordCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const calculatePregnancyProgress = () => {
    if (record.type === "pregnancy" && record.pregnancyDuration) {
      return Math.round((record.pregnancyDuration / 340) * 100);
    }
    return 0;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {typeIcon}
            {record.horseName}
          </CardTitle>
          <Badge variant={statusColor as any}>
            {record.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {record.type.charAt(0).toUpperCase() + record.type.slice(1)} Record
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Breeding Information */}
        {record.type === "breeding" && (
          <div className="space-y-2">
            {record.mateName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Mate:</span>
                <span className="font-medium">{record.mateName}</span>
              </div>
            )}
            {record.breedingDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{formatDate(record.breedingDate)}</span>
              </div>
            )}
            {record.breedingMethod && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium capitalize">{record.breedingMethod.replace("_", " ")}</span>
              </div>
            )}
          </div>
        )}

        {/* Pregnancy Information */}
        {record.type === "pregnancy" && (
          <div className="space-y-3">
            {record.pregnancyDuration && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    Day {record.pregnancyDuration}/340
                  </span>
                </div>
                <Progress value={calculatePregnancyProgress()} className="h-2" />
              </div>
            )}
            {record.expectedDueDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{formatDate(record.expectedDueDate)}</span>
              </div>
            )}
          </div>
        )}

        {/* Birth Information */}
        {record.type === "birth" && (
          <div className="space-y-2">
            {record.foalName && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Foal:</span>
                <span className="font-medium">{record.foalName}</span>
              </div>
            )}
            {record.birthDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Birth Date:</span>
                <span className="font-medium">{formatDate(record.birthDate)}</span>
              </div>
            )}
            {record.foalGender && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium capitalize">{record.foalGender}</span>
              </div>
            )}
          </div>
        )}

        {/* Common Information */}
        <div className="space-y-2 text-sm border-t pt-3">
          {record.veterinarian && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Veterinarian:</span>
              <span className="font-medium">{record.veterinarian}</span>
            </div>
          )}
          {record.cost && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">${record.cost.toLocaleString()}</span>
            </div>
          )}
          {record.notes && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <span className="text-muted-foreground">Notes:</span>
                <p className="text-sm mt-1">{record.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 flex items-center gap-1">
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingRecordCard;
