
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Lightbulb, 
  TrendingUp, 
  Bell,
  X,
  ChevronRight
} from "lucide-react";
import { AnalyticsInsight } from "@/types/analytics";

interface InsightsPanelProps {
  insights: AnalyticsInsight[];
  onDismiss: (insightId: string) => void;
}

const InsightsPanel = ({ insights, onDismiss }: InsightsPanelProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />;
      case 'recommendation':
        return <Lightbulb className="h-5 w-5" />;
      case 'trend':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const activeInsights = insights.filter(insight => !insight.dismissed);

  if (activeInsights.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Lightbulb className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Active Insights</h3>
          <p className="text-muted-foreground">
            We'll notify you when we discover new insights from your data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Business Insights</h3>
          <p className="text-muted-foreground">
            AI-powered insights and recommendations based on your data
          </p>
        </div>
        <Badge variant="secondary">
          {activeInsights.length} Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeInsights.map((insight) => (
          <Card key={insight.id} className={`relative ${getSeverityColor(insight.severity)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <div>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getSeverityBadgeVariant(insight.severity)} size="sm">
                        {insight.severity}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(insight.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{insight.description}</p>
              
              {insight.action && (
                <Button variant="outline" size="sm" className="w-full">
                  {insight.action}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              
              <div className="text-xs text-muted-foreground">
                Generated {insight.createdAt.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Insight Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {activeInsights.filter(i => i.severity === 'critical').length}
              </div>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {activeInsights.filter(i => i.severity === 'high').length}
              </div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {activeInsights.filter(i => i.type === 'recommendation').length}
              </div>
              <p className="text-sm text-muted-foreground">Recommendations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {activeInsights.filter(i => i.type === 'trend').length}
              </div>
              <p className="text-sm text-muted-foreground">Trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
