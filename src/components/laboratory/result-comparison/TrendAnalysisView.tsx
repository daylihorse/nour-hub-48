import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft, 
  Calendar, 
  Download, 
  BarChart3,
  ChartLine,
  ChartPie,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Brain,
  Zap
} from "lucide-react";

interface TrendAnalysisViewProps {
  horse: string;
  onBack: () => void;
}

const TrendAnalysisView = ({ horse, onBack }: TrendAnalysisViewProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [selectedParameter, setSelectedParameter] = useState("all");

  // Enhanced Mock trend data with historical values
  const trendData = {
    "White Blood Cells": {
      current: 6.5,
      unit: "x10³/μL",
      trend: "increasing",
      change: "+8.3%",
      risk: "low",
      referenceRange: "5.0-10.0",
      values: [5.5, 5.8, 6.2, 6.5],
      dates: ["2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01"],
      historicalData: [
        { date: "2024-01-15", value: 5.2, status: "normal" },
        { date: "2024-02-15", value: 5.5, status: "normal" },
        { date: "2024-03-15", value: 5.8, status: "normal" },
        { date: "2024-04-15", value: 6.2, status: "normal" },
        { date: "2024-05-15", value: 6.5, status: "normal" },
        { date: "2024-06-15", value: 6.5, status: "normal" }
      ]
    },
    "Red Blood Cells": {
      current: 8.2,
      unit: "x10⁶/μL",
      trend: "stable",
      change: "+2.5%",
      risk: "none",
      referenceRange: "6.5-12.0",
      values: [7.5, 7.8, 8.0, 8.2],
      dates: ["2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01"],
      historicalData: [
        { date: "2024-01-15", value: 7.3, status: "normal" },
        { date: "2024-02-15", value: 7.5, status: "normal" },
        { date: "2024-03-15", value: 7.8, status: "normal" },
        { date: "2024-04-15", value: 8.0, status: "normal" },
        { date: "2024-05-15", value: 8.1, status: "normal" },
        { date: "2024-06-15", value: 8.2, status: "normal" }
      ]
    },
    "Hemoglobin": {
      current: 14.5,
      unit: "g/dL",
      trend: "increasing",
      change: "+7.4%",
      risk: "low",
      referenceRange: "11.0-18.0",
      values: [13.5, 13.8, 14.2, 14.5],
      dates: ["2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01"],
      historicalData: [
        { date: "2024-01-15", value: 13.2, status: "normal" },
        { date: "2024-02-15", value: 13.5, status: "normal" },
        { date: "2024-03-15", value: 13.8, status: "normal" },
        { date: "2024-04-15", value: 14.2, status: "normal" },
        { date: "2024-05-15", value: 14.4, status: "normal" },
        { date: "2024-06-15", value: 14.5, status: "normal" }
      ]
    },
    "Hematocrit": {
      current: 42,
      unit: "%",
      trend: "increasing",
      change: "+7.7%",
      risk: "none",
      referenceRange: "32-48",
      values: [39, 40, 41, 42],
      dates: ["2024-03-01", "2024-04-01", "2024-05-01", "2024-06-01"],
      historicalData: [
        { date: "2024-01-15", value: 38, status: "normal" },
        { date: "2024-02-15", value: 39, status: "normal" },
        { date: "2024-03-15", value: 40, status: "normal" },
        { date: "2024-04-15", value: 41, status: "normal" },
        { date: "2024-05-15", value: 41.5, status: "normal" },
        { date: "2024-06-15", value: 42, status: "normal" }
      ]
    }
  };

  // Correlation data for correlation analysis
  const correlationData = [
    { param1: "Hemoglobin", param2: "Hematocrit", correlation: 0.92, strength: "Very Strong" },
    { param1: "RBC", param2: "Hemoglobin", correlation: 0.85, strength: "Strong" },
    { param1: "WBC", param2: "Exercise Level", correlation: -0.34, strength: "Weak" },
    { param1: "Hematocrit", param2: "Altitude", correlation: 0.67, strength: "Moderate" },
    { param1: "WBC", param2: "Stress Level", correlation: 0.45, strength: "Moderate" }
  ];

  // Prediction data
  const predictionData = {
    "White Blood Cells": {
      predicted: [6.7, 6.9, 7.1, 7.0],
      confidence: [95, 92, 88, 85],
      dates: ["2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01"]
    },
    "Red Blood Cells": {
      predicted: [8.3, 8.4, 8.3, 8.2],
      confidence: [98, 96, 94, 92],
      dates: ["2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01"]
    },
    "Hemoglobin": {
      predicted: [14.7, 14.8, 14.9, 14.8],
      confidence: [96, 94, 91, 88],
      dates: ["2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01"]
    },
    "Hematocrit": {
      predicted: [43, 43.5, 44, 43.8],
      confidence: [97, 95, 92, 89],
      dates: ["2024-07-01", "2024-08-01", "2024-09-01", "2024-10-01"]
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "decreasing") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <BarChart3 className="h-4 w-4 text-gray-500" />;
  };

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      none: { variant: "secondary", color: "green", text: "No Risk" },
      low: { variant: "outline", color: "yellow", text: "Low Risk" },
      medium: { variant: "destructive", color: "orange", text: "Medium Risk" },
      high: { variant: "destructive", color: "red", text: "High Risk" }
    };

    const config = riskConfig[risk as keyof typeof riskConfig] || riskConfig.none;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        {config.color === "green" && <CheckCircle className="h-3 w-3" />}
        {config.color !== "green" && <AlertTriangle className="h-3 w-3" />}
        {config.text}
      </Badge>
    );
  };

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.8) return "text-red-600 bg-red-50";
    if (abs >= 0.6) return "text-orange-600 bg-orange-50";
    if (abs >= 0.4) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  // Enhanced Chart Components with Mock Data Visualization
  const LineChartMock = ({ title, data }: { title: string; data: any }) => (
    <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border">
      <div className="h-full flex flex-col">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
        <div className="flex-1 relative">
          {/* Mock line chart with SVG */}
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <g stroke="#E5E7EB" strokeWidth="1">
              <line x1="50" y1="20" x2="50" y2="180" />
              <line x1="50" y1="180" x2="380" y2="180" />
              <line x1="50" y1="140" x2="380" y2="140" />
              <line x1="50" y1="100" x2="380" y2="100" />
              <line x1="50" y1="60" x2="380" y2="60" />
            </g>
            {/* Data line */}
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              points="70,160 140,140 210,120 280,100 350,90"
            />
            {/* Data points */}
            <circle cx="70" cy="160" r="4" fill="#3B82F6" />
            <circle cx="140" cy="140" r="4" fill="#3B82F6" />
            <circle cx="210" cy="120" r="4" fill="#3B82F6" />
            <circle cx="280" cy="100" r="4" fill="#3B82F6" />
            <circle cx="350" cy="90" r="4" fill="#3B82F6" />
            {/* Labels */}
            <text x="70" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Jan</text>
            <text x="140" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Feb</text>
            <text x="210" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Mar</text>
            <text x="280" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Apr</text>
            <text x="350" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">May</text>
          </svg>
        </div>
      </div>
    </div>
  );

  const BarChartMock = ({ title, data }: { title: string; data: any }) => (
    <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border">
      <div className="h-full flex flex-col">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
        <div className="flex-1 relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            <g stroke="#E5E7EB" strokeWidth="1">
              <line x1="50" y1="20" x2="50" y2="180" />
              <line x1="50" y1="180" x2="380" y2="180" />
            </g>
            {/* Bars */}
            <rect x="70" y="120" width="40" height="60" fill="#10B981" />
            <rect x="140" y="100" width="40" height="80" fill="#10B981" />
            <rect x="210" y="80" width="40" height="100" fill="#10B981" />
            <rect x="280" y="90" width="40" height="90" fill="#10B981" />
            {/* Labels */}
            <text x="90" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">WBC</text>
            <text x="160" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">RBC</text>
            <text x="230" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Hgb</text>
            <text x="300" y="195" textAnchor="middle" fontSize="10" fill="#6B7280">Hct</text>
          </svg>
        </div>
      </div>
    </div>
  );

  const PieChartMock = ({ title }: { title: string }) => (
    <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border">
      <div className="h-full flex flex-col">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
        <div className="flex-1 flex items-center justify-center">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#10B981" stroke="#fff" strokeWidth="2" 
                    strokeDasharray="75 25" strokeDashoffset="0" />
            <circle cx="50" cy="50" r="40" fill="#F59E0B" stroke="#fff" strokeWidth="2" 
                    strokeDasharray="15 85" strokeDashoffset="-75" />
            <circle cx="50" cy="50" r="40" fill="#EF4444" stroke="#fff" strokeWidth="2" 
                    strokeDasharray="10 90" strokeDashoffset="-90" />
          </svg>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Normal (75%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Watch (15%)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Alert (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Trend Analysis</h2>
            <p className="text-muted-foreground">
              Visualizing health trends and parameter changes for {horse}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="2years">2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Charts
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(trendData).map(([parameter, data]) => (
          <Card key={parameter}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{parameter}</p>
                {getTrendIcon(data.trend)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{data.current} <span className="text-sm font-normal text-muted-foreground">{data.unit}</span></div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.change}
                  </span>
                  {getRiskBadge(data.risk)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Range: {data.referenceRange}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual Trends</TabsTrigger>
          <TabsTrigger value="correlation">Correlations</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Parameter Trend Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartMock title="All Parameters Over Time" data={trendData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Parameter Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartMock title="Current Parameter Status" />
              </CardContent>
            </Card>
          </div>

          {/* Trend Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Trend Summary & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Positive Trends
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Hemoglobin levels improving (+7.4%)</li>
                      <li>• Red blood cell count stable and healthy</li>
                      <li>• Overall health markers within range</li>
                      <li>• Hematocrit showing steady improvement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Watch Areas
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• White blood cells slightly elevated</li>
                      <li>• Monitor for signs of inflammation</li>
                      <li>• Consider seasonal variations</li>
                      <li>• Track stress-related changes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Recommendations
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Continue current diet regimen</li>
                      <li>• Schedule follow-up in 3 months</li>
                      <li>• Monitor exercise tolerance</li>
                      <li>• Consider immune system support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">4</div>
                <div className="text-sm text-muted-foreground">Parameters Tracked</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">6 months</div>
                <div className="text-sm text-muted-foreground">Analysis Period</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-muted-foreground">Improving Trends</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-muted-foreground">Critical Values</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="mb-4">
            <Select value={selectedParameter} onValueChange={setSelectedParameter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select parameter to analyze" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parameters</SelectItem>
                <SelectItem value="wbc">White Blood Cells</SelectItem>
                <SelectItem value="rbc">Red Blood Cells</SelectItem>
                <SelectItem value="hemoglobin">Hemoglobin</SelectItem>
                <SelectItem value="hematocrit">Hematocrit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartMock title="Parameter Trends with Reference Ranges" data={trendData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChartMock title="Parameter Variability" data={trendData} />
              </CardContent>
            </Card>
          </div>

          {/* Individual Parameter Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(trendData).map(([parameter, data]) => (
              <Card key={parameter}>
                <CardHeader>
                  <CardTitle className="text-lg">{parameter}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <span className="font-semibold">{data.current} {data.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Reference Range</span>
                      <span className="text-sm">{data.referenceRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">6-Month Change</span>
                      <span className={`font-semibold ${data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {data.change}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Recent Values</span>
                      <div className="flex gap-2">
                        {data.values.map((value, index) => (
                          <div key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Correlations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {correlationData.map((corr, index) => (
                  <div key={index} className={`p-4 rounded-lg ${getCorrelationColor(corr.correlation)}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5" />
                        <span className="font-medium">{corr.param1} ↔ {corr.param2}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{corr.correlation.toFixed(2)}</div>
                        <div className="text-sm">{corr.strength}</div>
                      </div>
                    </div>
                    <Progress value={Math.abs(corr.correlation) * 100} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border">
                  <div className="h-full flex flex-col">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Seasonal Health Variations</h4>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="bg-blue-100 p-3 rounded text-center">
                        <div className="text-lg font-bold text-blue-800">Winter</div>
                        <div className="text-sm text-blue-600">Higher WBC</div>
                      </div>
                      <div className="bg-green-100 p-3 rounded text-center">
                        <div className="text-lg font-bold text-green-800">Spring</div>
                        <div className="text-sm text-green-600">Stable All</div>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded text-center">
                        <div className="text-lg font-bold text-yellow-800">Summer</div>
                        <div className="text-sm text-yellow-600">Lower Hct</div>
                      </div>
                      <div className="bg-orange-100 p-3 rounded text-center">
                        <div className="text-lg font-bold text-orange-800">Fall</div>
                        <div className="text-sm text-orange-600">Peak RBC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Exercise Level</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+0.78</div>
                      <div className="text-xs text-green-600">Strong Positive</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Rest Quality</span>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">+0.65</div>
                      <div className="text-xs text-blue-600">Moderate Positive</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium">Stress Level</span>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">-0.45</div>
                      <div className="text-xs text-yellow-600">Moderate Negative</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Nutrition Score</span>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">+0.82</div>
                      <div className="text-xs text-purple-600">Strong Positive</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Predictive Health Modeling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LineChartMock title="Predicted Parameter Values (Next 4 Months)" data={predictionData} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Cardiovascular Health</span>
                    </div>
                    <Badge variant="secondary">Low Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Immune System</span>
                    </div>
                    <Badge variant="outline">Monitor</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Overall Health</span>
                    </div>
                    <Badge variant="secondary">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Performance Readiness</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Next Test Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Complete Blood Count</p>
                    <p className="text-sm text-muted-foreground">Recommended in 3 months</p>
                    <div className="text-xs text-blue-600 mt-1">Priority: High</div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium">Blood Chemistry Panel</p>
                    <p className="text-sm text-muted-foreground">Annual check-up</p>
                    <div className="text-xs text-green-600 mt-1">Priority: Routine</div>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-medium">Inflammatory Markers</p>
                    <p className="text-sm text-muted-foreground">Consider if symptoms develop</p>
                    <div className="text-xs text-yellow-600 mt-1">Priority: Conditional</div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-medium">Immune Function Panel</p>
                    <p className="text-sm text-muted-foreground">Monitor WBC trends</p>
                    <div className="text-xs text-purple-600 mt-1">Priority: Medium</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(predictionData).map(([parameter, data]) => (
              <Card key={parameter}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    {parameter} Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.predicted.map((value, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{data.dates[index]}</span>
                        <div className="text-right">
                          <div className="font-semibold">{value}</div>
                          <div className="text-xs text-muted-foreground">{data.confidence[index]}% confidence</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrendAnalysisView; 