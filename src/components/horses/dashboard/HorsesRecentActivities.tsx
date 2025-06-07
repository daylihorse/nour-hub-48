
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Heart, Activity, Calendar, Users } from "lucide-react";

const HorsesRecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          Recent Activities & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Heart className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Health Check Completed</p>
              <p className="text-xs text-muted-foreground">Thunder - All vitals normal</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Activity className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Training Session</p>
              <p className="text-xs text-muted-foreground">Bella - Advanced dressage completed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <Calendar className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm font-medium">Upcoming Vaccination</p>
              <p className="text-xs text-muted-foreground">Shadow - Due in 3 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Users className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-sm font-medium">New Arrival</p>
              <p className="text-xs text-muted-foreground">Whisper - Arabian mare registered</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HorsesRecentActivities;
