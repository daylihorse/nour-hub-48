
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  nextMaintenance: string;
}

interface MaintenanceAlertsProps {
  equipment: Equipment[];
}

const MaintenanceAlerts = ({ equipment }: MaintenanceAlertsProps) => {
  const isMaintenanceDue = (nextMaintenance: string) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const daysDiff = Math.ceil((maintenanceDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7;
  };

  const dueForMaintenance = equipment.filter(item => isMaintenanceDue(item.nextMaintenance));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Maintenance Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dueForMaintenance.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Maintenance due: {item.nextMaintenance}</p>
              </div>
              <Button size="sm">Schedule Service</Button>
            </div>
          ))}
          {dueForMaintenance.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No maintenance alerts at this time</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceAlerts;
