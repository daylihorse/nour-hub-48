
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Stallion {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalMares: number;
  successfulBreedings: number;
  livefoals: number;
  successRate: number;
  studFee: number;
  nextAvailable: string;
  bookings: number;
}

interface StallionCardProps {
  stallion: Stallion;
}

const StallionCard = ({ stallion }: StallionCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "retired":
        return "secondary";
      case "unavailable":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{stallion.horseName}</CardTitle>
          <Badge variant={getStatusColor(stallion.status) as any}>
            {stallion.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {stallion.breed} • Age {stallion.age}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stallion.totalMares}</div>
            <p className="text-xs text-muted-foreground">Total Mares</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stallion.livefoals}</div>
            <p className="text-xs text-muted-foreground">Live Foals</p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Success Rate</span>
            <span className="text-sm font-bold text-green-600">{stallion.successRate}%</span>
          </div>
          <Progress value={stallion.successRate} className="h-2" />
        </div>

        {/* Breeding Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stud Fee:</span>
            <span className="font-medium">
              {stallion.studFee > 0 ? `$${stallion.studFee.toLocaleString()}` : "Retired"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Next Available:</span>
            <span className="font-medium">{stallion.nextAvailable}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pending Bookings:</span>
            <span className="font-medium">{stallion.bookings}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StallionCard;
