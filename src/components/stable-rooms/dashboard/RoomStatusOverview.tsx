
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

interface RoomStatusOverviewProps {
  metrics: {
    totalRooms: number;
    occupiedRooms: number;
    availableRooms: number;
    maintenanceRooms: number;
  };
}

const RoomStatusOverview = ({ metrics }: RoomStatusOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Room Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Occupied</span>
          <div className="flex items-center gap-2">
            <Badge variant="default">{metrics.occupiedRooms}</Badge>
            <div className="w-20 bg-muted rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(metrics.occupiedRooms / metrics.totalRooms) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Available</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{metrics.availableRooms}</Badge>
            <div className="w-20 bg-muted rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(metrics.availableRooms / metrics.totalRooms) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Maintenance</span>
          <div className="flex items-center gap-2">
            <Badge variant="destructive">{metrics.maintenanceRooms}</Badge>
            <div className="w-20 bg-muted rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(metrics.maintenanceRooms / metrics.totalRooms) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatusOverview;
