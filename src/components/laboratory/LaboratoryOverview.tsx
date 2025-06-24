
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLaboratoryData } from "@/hooks/useLaboratoryData";
import { 
  TestTube, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

const LaboratoryOverview = () => {
  const { 
    samples, 
    testResults, 
    equipment, 
    metrics, 
    isLoading, 
    metricsLoading 
  } = useLaboratoryData();

  if (isLoading || metricsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const pendingSamples = samples.filter(s => s.status === 'received' || s.status === 'processing').length;
  const completedToday = testResults.filter(r => {
    const today = new Date().toISOString().split('T')[0];
    return r.completed_at?.startsWith(today);
  }).length;
  const maintenanceEquipment = equipment.filter(e => e.status === 'maintenance').length;

  const dashboardMetrics = [
    {
      title: "Total Samples",
      value: metrics?.totalSamples || 0,
      icon: TestTube,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Pending Results",
      value: metrics?.pendingResults || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Today's Samples",
      value: metrics?.todaysSamples || 0,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Equipment Ready",
      value: metrics?.operationalEquipment || 0,
      icon: Settings,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title} className={`${metric.bgColor} ${metric.borderColor} border`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Samples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-blue-500" />
              Recent Samples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {samples.slice(0, 5).map((sample) => (
                <div key={sample.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{sample.sample_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {sample.horse_name} • {sample.sample_type}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      sample.status === 'completed' ? 'default' : 
                      sample.status === 'processing' ? 'secondary' : 
                      'outline'
                    }
                    className="capitalize"
                  >
                    {sample.status}
                  </Badge>
                </div>
              ))}
              {samples.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No samples yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Results Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Recent Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.slice(0, 5).map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{result.result_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {result.horse_name} • {result.test_type}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      result.status === 'completed' || result.status === 'reviewed' ? 'default' : 
                      result.status === 'in_progress' ? 'secondary' : 
                      'outline'
                    }
                    className="capitalize"
                  >
                    {result.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
              {testResults.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No test results yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-500" />
              Equipment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {equipment.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category} • {item.equipment_number}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      item.status === 'operational' ? 'default' : 
                      item.status === 'maintenance' ? 'secondary' : 
                      item.status === 'out_of_order' ? 'destructive' :
                      'outline'
                    }
                    className="capitalize"
                  >
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
              {equipment.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No equipment registered
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Samples Processed Today</span>
                <span className="text-sm font-medium">{completedToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Samples</span>
                <span className="text-sm font-medium">{pendingSamples}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Equipment in Maintenance</span>
                <span className="text-sm font-medium">{maintenanceEquipment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Processing Time</span>
                <span className="text-sm font-medium">2.5 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaboratoryOverview;
