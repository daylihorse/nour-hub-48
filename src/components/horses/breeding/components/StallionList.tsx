
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, DollarSign, Users } from "lucide-react";

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

interface StallionListProps {
  stallions: Stallion[];
}

const StallionList = ({ stallions }: StallionListProps) => {
  const navigate = useNavigate();

  const handleStallionClick = (stallionId: string) => {
    navigate(`/dashboard/horses/breeding/stallions/${stallionId}`);
  };

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
    <div className="space-y-4">
      {stallions.map((stallion) => (
        <div
          key={stallion.id}
          onClick={() => handleStallionClick(stallion.id)}
          className="cursor-pointer bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-lg">{stallion.horseName}</h3>
                  <Badge variant={getStatusColor(stallion.status) as any}>
                    {stallion.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {stallion.breed} • Age {stallion.age}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-600">{stallion.totalMares}</span>
                  <span className="text-sm text-muted-foreground">Mares</span>
                  <span className="font-medium text-green-600">{stallion.livefoals}</span>
                  <span className="text-sm text-muted-foreground">Foals</span>
                </div>
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Success Rate</span>
                    <span className="text-xs font-medium text-green-600">{stallion.successRate}%</span>
                  </div>
                  <Progress value={stallion.successRate} className="h-1 w-full" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {stallion.studFee > 0 ? `$${stallion.studFee.toLocaleString()}` : "Retired"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div className="text-sm">
                <span className="text-muted-foreground mr-1">Available:</span>
                <span className="font-medium">{stallion.nextAvailable}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <Button variant="outline" size="sm">Schedule</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StallionList;
