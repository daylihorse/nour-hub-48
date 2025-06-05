
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Horse, Heart, Baby, CheckCircle } from "lucide-react";
import { useBreedingClinicIntegration } from "@/hooks/useIntegration";

const ClinicIntegrationPanel = () => {
  const { integrations } = useBreedingClinicIntegration();

  const pendingAppointments = integrations.filter(i => i.status === 'pending');
  const scheduledAppointments = integrations.filter(i => i.status === 'scheduled');

  const getIcon = (triggerType: string) => {
    switch (triggerType) {
      case 'breeding_scheduled': return <Horse className="h-4 w-4" />;
      case 'pregnancy_confirmed': return <Heart className="h-4 w-4" />;
      case 'foaling_due': return <Baby className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getColorClass = (triggerType: string) => {
    switch (triggerType) {
      case 'breeding_scheduled': return 'text-blue-500';
      case 'pregnancy_confirmed': return 'text-pink-500';
      case 'foaling_due': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  if (pendingAppointments.length === 0 && scheduledAppointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Breeding Department Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No pending breeding-related appointments
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Horse className="h-5 w-5" />
          Breeding Department Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingAppointments.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Pending Appointments</h4>
            <div className="space-y-2">
              {pendingAppointments.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-3">
                    <div className={getColorClass(integration.triggerType)}>
                      {getIcon(integration.triggerType)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {integration.triggerType.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">{integration.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pending</Badge>
                    <Button size="sm">Schedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scheduledAppointments.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Scheduled Appointments</h4>
            <div className="space-y-2">
              {scheduledAppointments.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <div className={getColorClass(integration.triggerType)}>
                      {getIcon(integration.triggerType)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {integration.triggerType.replace('_', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">{integration.notes}</p>
                      <p className="text-xs text-muted-foreground">
                        Scheduled: {integration.scheduledDate?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Scheduled
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClinicIntegrationPanel;
