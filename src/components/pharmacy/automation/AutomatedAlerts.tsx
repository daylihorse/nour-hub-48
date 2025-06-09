
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell,
  Calendar,
  Package,
  AlertTriangle,
  Clock,
  Pill,
  Settings,
  CheckCircle,
  X
} from "lucide-react";

const AutomatedAlerts = () => {
  const [alertSettings, setAlertSettings] = useState({
    lowStock: true,
    expiration: true,
    refillReminders: true,
    maintenanceAlerts: true,
    complianceAlerts: true
  });

  const activeAlerts = [
    {
      id: "AL001",
      type: "low_stock",
      severity: "high",
      title: "Low Stock Alert",
      message: "Penicillin Injectable - Only 5 units remaining (Min: 20)",
      medication: "Penicillin Injectable",
      timestamp: "2024-01-15 14:30",
      status: "active",
      actionRequired: true,
      autoActions: ["Generate purchase order", "Notify supplier"]
    },
    {
      id: "AL002",
      type: "expiration",
      severity: "medium",
      title: "Expiration Warning",
      message: "Banamine Paste expires in 30 days (Batch: BAN2024005)",
      medication: "Banamine Paste",
      timestamp: "2024-01-15 09:00",
      status: "active",
      actionRequired: false,
      autoActions: ["Schedule inventory review"]
    },
    {
      id: "AL003",
      type: "refill_reminder",
      severity: "low",
      title: "Prescription Refill Due",
      message: "Thunder - Vitamin E & Selenium refill due in 3 days",
      medication: "Vitamin E & Selenium",
      horse: "Thunder",
      timestamp: "2024-01-15 08:00",
      status: "pending",
      actionRequired: true,
      autoActions: ["Prepare prescription", "Contact owner"]
    },
    {
      id: "AL004",
      type: "maintenance",
      severity: "medium",
      title: "Equipment Maintenance",
      message: "Refrigeration unit A-1 requires quarterly maintenance check",
      equipment: "Cold Storage A-1",
      timestamp: "2024-01-14 16:00",
      status: "active",
      actionRequired: true,
      autoActions: ["Schedule maintenance", "Check temperature logs"]
    },
    {
      id: "AL005",
      type: "compliance",
      severity: "high",
      title: "DEA Audit Required",
      message: "Controlled substance audit overdue for Ketamine (Schedule III)",
      medication: "Ketamine",
      timestamp: "2024-01-14 10:00",
      status: "critical",
      actionRequired: true,
      autoActions: ["Generate audit report", "Schedule DEA review"]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": 
      case "critical": return "bg-red-500";
      case "medium": return "bg-orange-500";
      case "low": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "low_stock": return <Package className="h-4 w-4" />;
      case "expiration": return <Calendar className="h-4 w-4" />;
      case "refill_reminder": return <Pill className="h-4 w-4" />;
      case "maintenance": return <Settings className="h-4 w-4" />;
      case "compliance": return <AlertTriangle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const updateAlertSetting = (setting: string, value: boolean) => {
    setAlertSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-500" />
            Automated Alerts & Notifications
          </h2>
          <p className="text-muted-foreground">Manage automated alerts and workflow notifications</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Low Stock Alerts</p>
                  <p className="text-xs text-muted-foreground">When inventory falls below minimum</p>
                </div>
                <Switch 
                  checked={alertSettings.lowStock}
                  onCheckedChange={(value) => updateAlertSetting('lowStock', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Expiration Warnings</p>
                  <p className="text-xs text-muted-foreground">90 days before expiration</p>
                </div>
                <Switch 
                  checked={alertSettings.expiration}
                  onCheckedChange={(value) => updateAlertSetting('expiration', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Refill Reminders</p>
                  <p className="text-xs text-muted-foreground">Automatic prescription reminders</p>
                </div>
                <Switch 
                  checked={alertSettings.refillReminders}
                  onCheckedChange={(value) => updateAlertSetting('refillReminders', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Maintenance Alerts</p>
                  <p className="text-xs text-muted-foreground">Equipment maintenance schedules</p>
                </div>
                <Switch 
                  checked={alertSettings.maintenanceAlerts}
                  onCheckedChange={(value) => updateAlertSetting('maintenanceAlerts', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Compliance Alerts</p>
                  <p className="text-xs text-muted-foreground">Regulatory and audit reminders</p>
                </div>
                <Switch 
                  checked={alertSettings.complianceAlerts}
                  onCheckedChange={(value) => updateAlertSetting('complianceAlerts', value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts
                <Badge className="bg-red-500 text-white">
                  {activeAlerts.filter(alert => alert.status === 'active' || alert.status === 'critical').length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                              {alert.severity}
                            </Badge>
                            <Badge variant="outline">
                              {alert.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.timestamp}
                            </span>
                            {alert.medication && (
                              <span>Medication: {alert.medication}</span>
                            )}
                            {alert.horse && (
                              <span>Horse: {alert.horse}</span>
                            )}
                            {alert.equipment && (
                              <span>Equipment: {alert.equipment}</span>
                            )}
                          </div>
                          
                          {alert.autoActions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-blue-600 mb-1">Auto Actions:</p>
                              <div className="flex flex-wrap gap-1">
                                {alert.autoActions.map((action, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {action}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {alert.actionRequired && (
                          <Button size="sm">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Action
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutomatedAlerts;
