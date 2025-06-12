
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wrench, Calendar } from "lucide-react";

interface Activity {
  id: number;
  type: "assignment" | "maintenance" | "checkout";
  message: string;
  time: string;
}

interface RecentActivityPanelProps {
  activities: Activity[];
}

const RecentActivityPanel = ({ activities }: RecentActivityPanelProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'assignment': return <Users className="h-4 w-4 text-blue-500" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-orange-500" />;
      case 'checkout': return <Calendar className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityPanel;
