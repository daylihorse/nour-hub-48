
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { useBreedingClinicIntegration, useClinicHorsesIntegration } from "@/hooks/useIntegration";

const IntegrationDashboard = () => {
  const { integrations: breedingIntegrations, events } = useBreedingClinicIntegration();
  const { integrations: horseIntegrations } = useClinicHorsesIntegration();

  const totalIntegrations = breedingIntegrations.length + horseIntegrations.length;
  const pendingIntegrations = breedingIntegrations.filter(i => i.status === 'pending').length;
  const completedIntegrations = breedingIntegrations.filter(i => i.status === 'completed').length;
  const recentEvents = events.slice(-10);
  
  const completionRate = totalIntegrations > 0 ? (completedIntegrations / totalIntegrations) * 100 : 0;

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'breeding_scheduled': return <Calendar className="h-4 w-4" />;
      case 'pregnancy_confirmed': return <Activity className="h-4 w-4" />;
      case 'health_check_completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'processing': return 'text-blue-500';
      case 'failed': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integration Dashboard</h1>
        <p className="text-muted-foreground">
          Cross-departmental integration overview and management
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Integrations</p>
                <p className="text-2xl font-bold">{totalIntegrations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingIntegrations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedIntegrations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{completionRate.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Completion</span>
                <span>{completionRate.toFixed(0)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-yellow-600">{pendingIntegrations}</div>
                <div className="text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-600">
                  {breedingIntegrations.filter(i => i.status === 'scheduled').length}
                </div>
                <div className="text-muted-foreground">Scheduled</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-600">{completedIntegrations}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="breeding">Breeding Integration</TabsTrigger>
          <TabsTrigger value="horses">Horse Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recent Integration Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No recent integration events
                </p>
              ) : (
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={getEventColor(event.status)}>
                          {getEventIcon(event.eventType)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {event.eventType.replace('_', ' ').toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.sourceModule} → {event.targetModule}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.createdAt.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          event.status === 'completed' ? 'default' :
                          event.status === 'failed' ? 'destructive' :
                          event.status === 'processing' ? 'secondary' : 'outline'
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="breeding" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Breeding → Clinic Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {breedingIntegrations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No breeding integrations found
                </p>
              ) : (
                <div className="space-y-3">
                  {breedingIntegrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">
                          {integration.triggerType.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">{integration.notes}</p>
                        {integration.scheduledDate && (
                          <p className="text-xs text-muted-foreground">
                            Scheduled: {integration.scheduledDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge variant={
                        integration.status === 'completed' ? 'default' :
                        integration.status === 'scheduled' ? 'secondary' : 'outline'
                      }>
                        {integration.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="horses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Clinic → Horse Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {horseIntegrations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No horse updates from clinic
                </p>
              ) : (
                <div className="space-y-3">
                  {horseIntegrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Horse {integration.horseId}</p>
                        <p className="text-xs text-muted-foreground">
                          {integration.updateType.replace('_', ' ')} updated
                        </p>
                        {integration.recommendations.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {integration.recommendations.length} recommendation(s)
                          </p>
                        )}
                      </div>
                      <Badge variant={integration.followUpRequired ? "destructive" : "default"}>
                        {integration.followUpRequired ? (
                          <>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Follow-up Required
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Complete
                          </>
                        )}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationDashboard;
