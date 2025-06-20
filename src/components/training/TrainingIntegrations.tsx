
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Database, 
  Users, 
  FileText, 
  DollarSign,
  Calendar,
  Activity,
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const TrainingIntegrations = () => {
  const integrations = [
    {
      title: "Horse Management",
      description: "Sync training records with horse profiles and health data",
      icon: Activity,
      status: "active",
      features: ["Performance tracking", "Health integration", "Progress monitoring"],
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Finance System",
      description: "Integrate training payments and billing with financial records",
      icon: DollarSign,
      status: "active",
      features: ["Automatic billing", "Payment tracking", "Revenue reporting"],
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Client Management",
      description: "Connect training programs with client profiles and communications",
      icon: Users,
      status: "active",
      features: ["Client enrollment", "Progress updates", "Communication logs"],
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Scheduling System",
      description: "Synchronize training sessions with facility bookings",
      icon: Calendar,
      status: "partial",
      features: ["Facility booking", "Trainer schedules", "Conflict resolution"],
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Document Management",
      description: "Link training certificates and assessments to document system",
      icon: FileText,
      status: "pending",
      features: ["Certificate generation", "Assessment storage", "Record keeping"],
      color: "bg-gray-100 text-gray-800"
    },
    {
      title: "Inventory Integration",
      description: "Track training equipment usage and maintenance needs",
      icon: Database,
      status: "pending",
      features: ["Equipment tracking", "Maintenance scheduling", "Usage analytics"],
      color: "bg-gray-100 text-gray-800"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training System Integrations</h2>
          <p className="text-muted-foreground">
            Manage cross-system integrations and data synchronization
          </p>
        </div>
        <Button>
          <Network className="h-4 w-4 mr-2" />
          Configure Integration
        </Button>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-muted-foreground">Active Integrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-muted-foreground">Partial Integrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-600">2</div>
            <p className="text-sm text-muted-foreground">Pending Setup</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.title} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${integration.color}`}>
                    <integration.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  {getStatusBadge(integration.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Available Features:</p>
                <div className="space-y-1">
                  {integration.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                {integration.status === 'active' ? (
                  <>
                    <Button variant="outline" size="sm">Configure</Button>
                    <Button variant="outline" size="sm">View Logs</Button>
                  </>
                ) : integration.status === 'partial' ? (
                  <>
                    <Button size="sm">Complete Setup</Button>
                    <Button variant="outline" size="sm">Configure</Button>
                  </>
                ) : (
                  <Button size="sm">Enable Integration</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Flow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Data Flow Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Real-time Synchronization</h4>
              <p className="text-sm text-blue-800">
                Training session data automatically syncs with horse health records, 
                client progress reports, and billing systems in real-time.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Cross-Module Analytics</h4>
              <p className="text-sm text-green-800">
                Integrated data enables comprehensive reporting across training performance, 
                financial metrics, and operational efficiency.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Automated Workflows</h4>
              <p className="text-sm text-purple-800">
                Trigger automated actions like invoice generation, progress notifications, 
                and facility booking confirmations based on training activities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingIntegrations;
