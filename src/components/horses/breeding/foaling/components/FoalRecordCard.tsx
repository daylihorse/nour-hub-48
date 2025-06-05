
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Baby, Heart, Calendar, Trophy, Syringe, FileText } from "lucide-react";

interface FoalRecord {
  id: string;
  foalName: string;
  registrationNumber: string;
  birthDate: string;
  gender: string;
  mareName: string;
  stallionName: string;
  color: string;
  markings: string;
  birthWeight: number;
  currentWeight: number;
  height: number;
  healthStatus: string;
  vaccinationStatus: string;
  nextVaccination: string;
  microchipId: string;
  passportNumber: string;
  notes: string;
  achievements: string[];
}

interface FoalRecordCardProps {
  record: FoalRecord;
}

const FoalRecordCard = ({ record }: FoalRecordCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "outline";
      case "monitoring":
        return "default";
      case "needs_attention":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getVaccinationColor = (status: string) => {
    switch (status) {
      case "up_to_date":
        return "outline";
      case "due_soon":
        return "default";
      case "overdue":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  const calculateWeightGain = () => {
    return ((record.currentWeight - record.birthWeight) / record.birthWeight * 100).toFixed(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Baby className={`h-5 w-5 ${record.gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} />
            {record.foalName}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(record.healthStatus) as any}>
              {record.healthStatus.replace('_', ' ')}
            </Badge>
            <Badge variant={getVaccinationColor(record.vaccinationStatus) as any}>
              <Syringe className="h-3 w-3 mr-1" />
              vaccines
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {record.color} {record.gender} • {calculateAge(record.birthDate)} old • {record.registrationNumber}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Parents */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-pink-50 rounded-lg">
            <div className="text-sm font-medium text-pink-600">Dam</div>
            <div className="text-lg font-bold">{record.mareName}</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-600">Sire</div>
            <div className="text-lg font-bold">{record.stallionName}</div>
          </div>
        </div>

        {/* Physical Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold">{record.currentWeight}kg</div>
            <p className="text-xs text-muted-foreground">Current Weight</p>
            <p className="text-xs text-green-600">+{calculateWeightGain()}%</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold">{record.height}cm</div>
            <p className="text-xs text-muted-foreground">Height</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold">{record.birthWeight}kg</div>
            <p className="text-xs text-muted-foreground">Birth Weight</p>
          </div>
        </div>

        {/* Health & Documentation */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Next Vaccination:</span>
            <span className="font-medium">{formatDate(record.nextVaccination)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Microchip:</span>
            <span className="font-medium">{record.microchipId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Passport:</span>
            <span className="font-medium">{record.passportNumber}</span>
          </div>
        </div>

        {/* Markings */}
        {record.markings && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Markings:</p>
            <p className="text-sm">{record.markings}</p>
          </div>
        )}

        {/* Achievements */}
        {record.achievements.length > 0 && (
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-600" />
              <p className="text-xs text-muted-foreground">Achievements:</p>
            </div>
            <div className="space-y-1">
              {record.achievements.map((achievement, index) => (
                <p key={index} className="text-sm text-yellow-700">{achievement}</p>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {record.notes && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Notes:</p>
            <p className="text-sm">{record.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-1" />
            View Profile
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Heart className="h-4 w-4 mr-1" />
            Health Records
          </Button>
          <Button size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Care
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoalRecordCard;
