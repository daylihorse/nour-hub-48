
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
  Eye,
  FileText,
  Settings
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import MetricsGrid from "./components/MetricsGrid";
import InsightsPanel from "./components/InsightsPanel";
import ChartContainer from "./components/ChartContainer";
import ReportBuilder from "./components/ReportBuilder";

const AnalyticsDashboard = () => {
  const { metrics, insights, loading, fetchMetrics, dismissInsight } = useAnalytics();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const handleRefresh = () => {
    fetchMetrics();
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    fetchMetrics(undefined, period);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Advanced analytics and business intelligence for your operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {['week', 'month', 'quarter', 'year'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePeriodChange(period)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="dashboards" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Dashboards
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <MetricsGrid metrics={metrics} loading={loading} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              title="Revenue Trend"
              type="line"
              data={[
                { month: 'Jan', revenue: 45000, expenses: 32000 },
                { month: 'Feb', revenue: 52000, expenses: 35000 },
                { month: 'Mar', revenue: 48000, expenses: 33000 },
                { month: 'Apr', revenue: 61000, expenses: 38000 },
                { month: 'May', revenue: 55000, expenses: 36000 },
                { month: 'Jun', revenue: 67000, expenses: 41000 }
              ]}
              xAxis="month"
              yAxis={['revenue', 'expenses']}
            />
            
            <ChartContainer
              title="Training Performance"
              type="bar"
              data={[
                { program: 'Basic', completed: 45, enrolled: 52 },
                { program: 'Intermediate', completed: 38, enrolled: 41 },
                { program: 'Advanced', completed: 29, enrolled: 34 },
                { program: 'Competition', completed: 22, enrolled: 25 }
              ]}
              xAxis="program"
              yAxis={['completed', 'enrolled']}
            />
          </div>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Training</span>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Finance</span>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Operations</span>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600">91%</div>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Client Service</span>
                    <Badge variant="outline">Needs Attention</Badge>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">78%</div>
                  <p className="text-xs text-muted-foreground">Performance Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <InsightsPanel insights={insights} onDismiss={dismissInsight} />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportBuilder />
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Custom Dashboards</h3>
              <p className="text-muted-foreground mb-4">
                Create and manage custom dashboards for different stakeholders.
              </p>
              <Button>Create Dashboard</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Analytics Settings</h3>
              <p className="text-muted-foreground mb-4">
                Configure data sources, refresh intervals, and user permissions.
              </p>
              <Button>Configure Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
