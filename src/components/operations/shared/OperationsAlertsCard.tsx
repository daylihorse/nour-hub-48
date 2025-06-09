
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { OperationAlert } from "@/types/operations";
import { getPriorityColor } from "@/utils/operationsUtils";

interface OperationsAlertsCardProps {
  alerts: OperationAlert[];
}

const OperationsAlertsCard = ({ alerts }: OperationsAlertsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Operations Alerts
          <Badge variant="destructive">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getPriorityColor(alert.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant="outline" className="text-xs capitalize">
                      {alert.type}
                    </Badge>
                    <Badge 
                      variant={alert.priority === 'critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {alert.actionRequired && (
                  <Button size="sm" variant="outline">
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationsAlertsCard;
