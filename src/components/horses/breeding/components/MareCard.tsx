
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Baby, Heart } from "lucide-react";

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

interface MareCardProps {
  mare: Mare;
}

const MareCard = ({ mare }: MareCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pregnant":
        return "default";
      case "open":
        return "secondary";
      case "nursing":
        return "outline";
      case "bred":
        return "destructive";
      case "retired":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pregnant":
        return <Baby className="h-4 w-4" />;
      case "nursing":
        return <Heart className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const calculatePregnancyProgress = (pregnancyDay: number) => {
    return Math.round((pregnancyDay / 340) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getStatusIcon(mare.status)}
            {mare.horseName}
          </CardTitle>
          <Badge variant={getStatusColor(mare.status) as any}>
            {mare.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {mare.breed} • Age {mare.age}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Breeding History */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{mare.totalFoals}</div>
            <p className="text-xs text-muted-foreground">Total Foals</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{mare.liveFoals}</div>
            <p className="text-xs text-muted-foreground">Live Foals</p>
          </div>
        </div>

        {/* Pregnancy Progress */}
        {mare.status === "pregnant" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pregnancy Progress</span>
              <span className="text-sm font-bold">Day {mare.pregnancyDay}/340</span>
            </div>
            <Progress value={calculatePregnancyProgress(mare.pregnancyDay)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Due: {mare.expectedDueDate && formatDate(mare.expectedDueDate)}
            </p>
          </div>
        )}

        {/* Breeding Information */}
        <div className="space-y-2 text-sm">
          {mare.stallionName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sire:</span>
              <span className="font-medium">{mare.stallionName}</span>
            </div>
          )}
          {mare.lastBreedingDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Breeding:</span>
              <span className="font-medium">{formatDate(mare.lastBreedingDate)}</span>
            </div>
          )}
          {mare.nextHeat && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Heat:</span>
              <span className="font-medium">{formatDate(mare.nextHeat)}</span>
            </div>
          )}
          {mare.foalBirthDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Foal Born:</span>
              <span className="font-medium">{formatDate(mare.foalBirthDate)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {mare.status === "open" && (
            <Button size="sm" className="flex-1">
              Schedule Breeding
            </Button>
          )}
          {mare.status === "pregnant" && (
            <Button variant="outline" size="sm" className="flex-1">
              Checkup
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MareCard;
