
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Sync,
  Hospital,
  FlaskRound,
  Horse
} from "lucide-react";

const PharmacyIntegrationDashboard = () => {
  const integrationStats = {
    clinicPrescriptions: 8,
    horseRecordsSync: 15,
    labOrders: 3,
    pendingSync: 2
  };

  const recentIntegrations = [
    {
      id: 1,
      type: "clinic",
      title: "New prescription from Dr. Smith",
      horse: "Thunder",
      status: "processed",
      timestamp: "2 minutes ago",
      details: "Penicillin prescription automatically added to inventory"
    },
    {
      id: 2,
      type: "horse",
      title: "Medication history updated",
      horse: "Lightning",
      status: "synced",
      timestamp: "5 minutes ago",
      details: "Vaccination records synchronized with horse profile"
    },
    {
      id: 3,
      type: "laboratory",
      title: "Lab results trigger medication",
      horse: "Storm",
      status: "pending",
      timestamp: "10 minutes ago",
      details: "Blood test results suggest antibiotic treatment"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "clinic": return <Hospital className="h-4 w-4" />;
      case "horse": return <Horse className="h-4 w-4" />;
      case "laboratory": return <FlaskRound className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
      case "synced": return "bg-green-500";
      case "pending": return "bg-orange-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Hospital className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Clinic Prescriptions</p>
                <p className="text-2xl font-bold">{integrationStats.clinicPrescriptions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Horse className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Horse Records Sync</p>
                <p className="text-2xl font-bold">{integrationStats.horseRecordsSync}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Lab Orders</p>
                <p className="text-2xl font-bold">{integrationStats.labOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Sync className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Sync</p>
                <p className="text-2xl font-bold">{integrationStats.pendingSync}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Integration Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Integration Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIntegrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(integration.type)}
                  </div>
                  <div>
                    <p className="font-medium">{integration.title}</p>
                    <p className="text-sm text-muted-foreground">Horse: {integration.horse}</p>
                    <p className="text-xs text-muted-foreground">{integration.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(integration.status)} text-white mb-1`}>
                    {integration.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{integration.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Integration Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Hospital className="h-5 w-5 text-blue-500" />
              Clinic Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Sync prescriptions and treatment plans from clinic visits
            </p>
            <Button className="w-full" variant="outline">
              <ArrowRight className="h-4 w-4 mr-2" />
              Manage Clinic Sync
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Horse className="h-5 w-5 text-green-500" />
              Horse Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update medication histories and health records automatically
            </p>
            <Button className="w-full" variant="outline">
              <ArrowRight className="h-4 w-4 mr-2" />
              Sync Horse Records
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FlaskRound className="h-5 w-5 text-purple-500" />
              Laboratory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create prescriptions based on laboratory test results
            </p>
            <Button className="w-full" variant="outline">
              <ArrowRight className="h-4 w-4 mr-2" />
              Review Lab Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyIntegrationDashboard;
