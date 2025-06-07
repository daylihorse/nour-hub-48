
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { BREEDING_STATUS } from "../constants/breedingConstants";

interface ActivityItem {
  id: number;
  type: string;
  message: string;
  date: string;
  status: string;
}

interface BreedingRecentActivityProps {
  activities: ActivityItem[];
}

const BreedingRecentActivity = ({ activities }: BreedingRecentActivityProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case BREEDING_STATUS.SUCCESS:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case BREEDING_STATUS.PENDING:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(activity.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingRecentActivity;
