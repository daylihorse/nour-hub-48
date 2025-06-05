
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Baby, Weight, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface BirthRecord {
  id: string;
  foalName: string;
  mareName: string;
  stallionName: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  birthWeight: number;
  height: number;
  status: string;
  complications: string;
  veterinarian: string;
  registrationNumber: string;
  color: string;
  markings: string;
  notes: string;
}

interface BirthRecordCardProps {
  record: BirthRecord;
}

const BirthRecordCard = ({ record }: BirthRecordCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "outline";
      case "needs_attention":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "needs_attention":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Baby className="h-5 w-5 text-pink-500" />
            {record.foalName}
          </CardTitle>
          <Badge variant={getStatusColor(record.status) as any}>
            {getStatusIcon(record.status)}
            {record.status.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {record.gender} • {record.color} • {formatDate(record.birthDate)}
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

        {/* Birth Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Weight className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <div className="text-lg font-bold">{record.birthWeight}kg</div>
            <p className="text-xs text-muted-foreground">Birth Weight</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <div className="text-lg font-bold">{record.birthTime}</div>
            <p className="text-xs text-muted-foreground">Birth Time</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registration:</span>
            <span className="font-medium">{record.registrationNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Height:</span>
            <span className="font-medium">{record.height}cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Veterinarian:</span>
            <span className="font-medium">{record.veterinarian}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Complications:</span>
            <span className={`font-medium ${record.complications === "None" ? "text-green-600" : "text-orange-600"}`}>
              {record.complications}
            </span>
          </div>
        </div>

        {/* Markings */}
        {record.markings && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Markings:</p>
            <p className="text-sm">{record.markings}</p>
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
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit Record
          </Button>
          <Button size="sm" className="flex-1">
            Create Foal Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthRecordCard;
