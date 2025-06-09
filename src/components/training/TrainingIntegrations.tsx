
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrainingData } from "@/hooks/useTrainingData";
import { useOperationsData } from "@/hooks/useOperationsData";
import { 
  Stethoscope, 
  Package, 
  DollarSign, 
  Users, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

const TrainingIntegrations = () => {
  const { workflows } = useTrainingData();
  const { alerts } = useOperationsData();

  const integrationStatus = {
    clinic: { connected: true, lastSync: new Date(), alerts: 2 },
    inventory: { connected: true, lastSync: new Date(), alerts: 1 },
    finance: { connected: true, lastSync: new Date(), alerts: 0 },
    hr: { connected: true, lastSync: new Date(), alerts: 3 }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cross-Departmental Integrations</h2>
        <p className="text-muted-foreground">
          Real-time integration status and automated workflow management
        </p>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              <Badge variant={integrationStatus.clinic.connected ? 'default' : 'destructive'}>
                {integrationStatus.clinic.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">Clinic Integration</h3>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                Last sync: {integrationStatus.clinic.lastSync.toLocaleTimeString()}
              </p>
              <p className="text-muted-foreground">
                {integrationStatus.clinic.alerts} active alerts
              </p>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Package className="h-5 w-5 text-green-500" />
              <Badge variant={integrationStatus.inventory.connected ? 'default' : 'destructive'}>
                {integrationStatus.inventory.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">Inventory Integration</h3>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                Last sync: {integrationStatus.inventory.lastSync.toLocaleTimeString()}
              </p>
              <p className="text-muted-foreground">
                {integrationStatus.inventory.alerts} active alerts
              </p>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <Badge variant={integrationStatus.finance.connected ? 'default' : 'destructive'}>
                {integrationStatus.finance.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">Finance Integration</h3>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                Last sync: {integrationStatus.finance.lastSync.toLocaleTimeString()}
              </p>
              <p className="text-muted-foreground">
                {integrationStatus.finance.alerts} active alerts
              </p>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-purple-500" />
              <Badge variant={integrationStatus.hr.connected ? 'default' : 'destructive'}>
                {integrationStatus.hr.connected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-medium mb-2">HR Integration</h3>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                Last sync: {integrationStatus.hr.lastSync.toLocaleTimeString()}
              </p>
              <p className="text-muted-foreground">
                {integrationStatus.hr.alerts} active alerts
              </p>
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Active Cross-Departmental Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">
                      {workflow.type.replace('_', ' ').toUpperCase()} - Horse #{workflow.horseId}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Created {workflow.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={workflow.status === 'completed' ? 'default' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-3">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          step.status === 'completed' ? 'bg-green-500 text-white' :
                          step.status === 'in_progress' ? 'bg-blue-500 text-white' :
                          step.status === 'blocked' ? 'bg-red-500 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : step.status === 'blocked' ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : step.status === 'in_progress' ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <p className="text-xs mt-1 text-center max-w-20 truncate">
                          {step.department}
                        </p>
                      </div>
                      {index < workflow.steps.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workflow.steps.map((step) => (
                    <div key={step.id} className="p-3 bg-muted/30 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-sm font-medium">{step.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          {step.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {step.department}
                      </p>
                      {step.assignedTo && (
                        <p className="text-xs">
                          <span className="text-muted-foreground">Assigned: </span>
                          {step.assignedTo}
                        </p>
                      )}
                      <p className="text-xs">
                        <span className="text-muted-foreground">Est. Time: </span>
                        {step.estimatedTime}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Integration Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-orange-800">Equipment Allocation Required</h4>
                  <p className="text-sm text-orange-700">
                    Training program "Advanced Dressage" needs specialized equipment allocation from Inventory
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Resolve
                </Button>
              </div>
            </div>
            
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-blue-800">Health Clearance Pending</h4>
                  <p className="text-sm text-blue-700">
                    Horse #H003 requires veterinary clearance before starting training program
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Check Status
                </Button>
              </div>
            </div>
            
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-green-800">Payment Confirmation</h4>
                  <p className="text-sm text-green-700">
                    Training fees for January programs have been successfully processed
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingIntegrations;
