
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useBreedingClinicIntegration } from "@/hooks/useIntegration";

const IntegrationStatusBar = () => {
  const { integrations, events } = useBreedingClinicIntegration();

  const pendingIntegrations = integrations.filter(i => i.status === 'pending');
  const recentEvents = events.slice(-5);

  if (pendingIntegrations.length === 0 && recentEvents.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Cross-Departmental Integration</p>
              <p className="text-xs text-blue-700">
                {pendingIntegrations.length} pending clinic appointments, {recentEvents.length} recent events
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pendingIntegrations.map((integration, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {integration.triggerType.replace('_', ' ')}
              </Badge>
            ))}
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatusBar;
