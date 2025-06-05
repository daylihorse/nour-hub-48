
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, Calendar, AlertCircle } from "lucide-react";

const OptimalTimingAnalysis = () => {
  const timingAnalysis = [
    {
      horse: "Whisper",
      nextOptimalWindow: "Feb 15-20, 2024",
      confidence: 92,
      factors: ["Peak fertility cycle", "Optimal age window", "Seasonal advantage"],
      recommendations: "Proceed with planned breeding",
      status: "optimal"
    },
    {
      horse: "Grace", 
      nextOptimalWindow: "Mar 5-10, 2024",
      confidence: 78,
      factors: ["Regular cycle pattern", "Good body condition", "Previous success"],
      recommendations: "Monitor cycle closely",
      status: "good"
    },
    {
      horse: "Bella",
      nextOptimalWindow: "Apr 1-6, 2024", 
      confidence: 65,
      factors: ["Irregular cycle history", "Age considerations", "Nutrition needs"],
      recommendations: "Veterinary consultation advised",
      status: "caution"
    }
  ];

  const seasonalFactors = [
    {
      factor: "Temperature",
      impact: "High",
      current: "Optimal",
      trend: "stable",
      description: "Moderate temperatures favor conception rates"
    },
    {
      factor: "Daylight Hours",
      impact: "Medium", 
      current: "Increasing",
      trend: "improving",
      description: "Longer days trigger natural breeding cycles"
    },
    {
      factor: "Nutrition Quality",
      impact: "High",
      current: "Excellent",
      trend: "stable", 
      description: "Fresh pasture and supplements available"
    },
    {
      factor: "Stallion Availability",
      impact: "Medium",
      current: "Limited",
      trend: "declining",
      description: "Peak season demand affecting availability"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-100";
      case "good": return "text-blue-600 bg-blue-100";
      case "caution": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "declining": return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case "stable": return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Individual Mare Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Individual Mare Timing Analysis</h3>
        {timingAnalysis.map((analysis, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{analysis.horse}</CardTitle>
                <Badge variant="outline" className={getStatusColor(analysis.status)}>
                  {analysis.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Optimal Window */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Next Optimal Window</span>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {analysis.nextOptimalWindow}
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Prediction Confidence</span>
                  <span className="text-sm font-bold">{analysis.confidence}%</span>
                </div>
                <Progress value={analysis.confidence} className="h-2" />
              </div>

              {/* Contributing Factors */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Contributing Factors</h4>
                <ul className="space-y-1">
                  {analysis.factors.map((factor, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendation */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-sm">Recommendation: </span>
                    <span className="text-sm text-muted-foreground">{analysis.recommendations}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seasonal Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Seasonal Timing Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasonalFactors.map((factor, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{factor.factor}</span>
                    {getTrendIcon(factor.trend)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getImpactColor(factor.impact) as any} className="text-xs">
                      {factor.impact} Impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {factor.current}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Timing Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Timing Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">This Month's Priorities</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">HIGH</span>
                  <span className="text-sm">Schedule Whisper's breeding (optimal window)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">MEDIUM</span>
                  <span className="text-sm">Monitor Grace's cycle progression</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">PLAN</span>
                  <span className="text-sm">Prepare Bella for next month's evaluation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Success Optimization Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Track mare cycles for 2-3 months before breeding</li>
                <li>• Schedule breeding during optimal seasonal windows</li>
                <li>• Consider stallion availability well in advance</li>
                <li>• Factor in nutritional and health preparations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimalTimingAnalysis;
