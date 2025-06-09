
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ArrowRightLeft, 
  Warehouse, 
  Rabbit, 
  FlaskRound, 
  Hospital, 
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface OperationAlert {
  id: string;
  type: 'inventory' | 'movement' | 'room' | 'horse' | 'lab' | 'clinic' | 'finance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  actionRequired: boolean;
}

const UnifiedOperationsDashboard = () => {
  // Mock data for unified operations view
  const alerts: OperationAlert[] = [
    {
      id: '1',
      type: 'inventory',
      priority: 'critical',
      title: 'Low Feed Stock',
      message: 'Premium hay supply below minimum threshold',
      timestamp: new Date(),
      actionRequired: true
    },
    {
      id: '2',
      type: 'movement',
      priority: 'high',
      title: 'Incoming Arrival',
      message: 'Arabian mare scheduled for arrival in 2 hours',
      timestamp: new Date(),
      actionRequired: true
    },
    {
      id: '3',
      type: 'lab',
      priority: 'medium',
      title: 'Test Results Ready',
      message: '3 blood test results awaiting review',
      timestamp: new Date(),
      actionRequired: false
    }
  ];

  const operationsStats = {
    activeHorses: 47,
    occupiedRooms: 32,
    pendingMovements: 5,
    lowStockItems: 8,
    pendingLabTests: 12,
    scheduledAppointments: 7,
    outstandingInvoices: 3
  };

  const quickActions = [
    {
      title: "Process Arrival",
      icon: ArrowRightLeft,
      link: "/dashboard/movements",
      color: "bg-blue-500"
    },
    {
      title: "Assign Room",
      icon: Warehouse,
      link: "/dashboard/rooms",
      color: "bg-green-500"
    },
    {
      title: "Order Supplies",
      icon: Package,
      link: "/dashboard/inventory",
      color: "bg-orange-500"
    },
    {
      title: "Schedule Test",
      icon: FlaskRound,
      link: "/dashboard/laboratory",
      color: "bg-purple-500"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Unified Operations Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive facility management and cross-departmental operations
        </p>
      </div>

      {/* Operations Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Rabbit className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Active Horses</p>
                <p className="text-lg font-bold">{operationsStats.activeHorses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Occupied Rooms</p>
                <p className="text-lg font-bold">{operationsStats.occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Movements</p>
                <p className="text-lg font-bold">{operationsStats.pendingMovements}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Low Stock</p>
                <p className="text-lg font-bold">{operationsStats.lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FlaskRound className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-xs text-muted-foreground">Lab Tests</p>
                <p className="text-lg font-bold">{operationsStats.pendingLabTests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Hospital className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-xs text-muted-foreground">Appointments</p>
                <p className="text-lg font-bold">{operationsStats.scheduledAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">Invoices</p>
                <p className="text-lg font-bold">{operationsStats.outstandingInvoices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.link}>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 w-full">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm">{action.title}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Notifications */}
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
    </div>
  );
};

export default UnifiedOperationsDashboard;
