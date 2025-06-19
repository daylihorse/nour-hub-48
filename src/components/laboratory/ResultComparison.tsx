
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, Calendar, TestTube, Activity } from "lucide-react";
import HorseSelectionDialog from "./result-comparison/HorseSelectionDialog";
import AnalysisTypeDialog from "./result-comparison/AnalysisTypeDialog";
import ExportOptionsDialog from "./result-comparison/ExportOptionsDialog";

const ResultComparison = () => {
  const [showHorseDialog, setShowHorseDialog] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const handleHorseSelect = (horseId: string, horseName: string) => {
    setSelectedHorse(horseName);
    setShowHorseDialog(false);
    setShowAnalysisDialog(true);
  };

  const handleAnalysisSelect = (analysisType: string) => {
    setSelectedAnalysis(analysisType);
    setShowAnalysisDialog(false);
  };

  const mockComparisonData = [
    {
      parameter: "White Blood Cells",
      currentValue: "8.5",
      previousValue: "7.2",
      unit: "×10³/μL",
      normalRange: "5.5-12.0",
      trend: "up",
      change: "+18%"
    },
    {
      parameter: "Red Blood Cells",
      currentValue: "7.8",
      previousValue: "8.1",
      unit: "×10⁶/μL",
      normalRange: "6.5-12.5",
      trend: "down",
      change: "-4%"
    },
    {
      parameter: "Hemoglobin",
      currentValue: "13.2",
      previousValue: "13.0",
      unit: "g/dL",
      normalRange: "11.0-19.0",
      trend: "up",
      change: "+2%"
    },
    {
      parameter: "Glucose",
      currentValue: "95",
      previousValue: "102",
      unit: "mg/dL",
      normalRange: "75-115",
      trend: "down",
      change: "-7%"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Laboratory Result Comparison</h1>
          <p className="text-muted-foreground">Compare test results across different time periods</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowExportDialog(true)}>
            Export Results
          </Button>
          <Button onClick={() => setShowHorseDialog(true)}>
            <TestTube className="mr-2 h-4 w-4" />
            New Comparison
          </Button>
        </div>
      </div>

      {/* Current Selection */}
      {selectedHorse && selectedAnalysis && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">
                    {selectedAnalysis} - {selectedHorse}
                  </p>
                  <p className="text-sm text-blue-700">
                    Comparing latest results with previous month
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  <Calendar className="h-3 w-3 mr-1" />
                  June 2024 vs May 2024
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Results */}
      {selectedHorse && selectedAnalysis ? (
        <Tabs defaultValue="parameters" className="w-full">
          <TabsList>
            <TabsTrigger value="parameters">Parameter Comparison</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="charts">Visual Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters">
            <Card>
              <CardHeader>
                <CardTitle>Parameter Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockComparisonData.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{item.parameter}</h4>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(item.trend)}
                          <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-medium">{item.currentValue} {item.unit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Previous</p>
                          <p className="font-medium">{item.previousValue} {item.unit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Normal Range</p>
                          <p className="font-medium">{item.normalRange} {item.unit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge variant="outline" className="text-green-600">
                            Normal
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Trend analysis charts would be displayed here showing parameter changes over time.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <Card>
              <CardHeader>
                <CardTitle>Visual Charts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interactive charts comparing current vs previous results would be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <TestTube className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Comparison Selected
            </h3>
            <p className="text-gray-600 mb-6">
              Select a horse and analysis type to start comparing laboratory results.
            </p>
            <Button onClick={() => setShowHorseDialog(true)}>
              Start New Comparison
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <HorseSelectionDialog
        isOpen={showHorseDialog}
        onClose={() => setShowHorseDialog(false)}
        onSelect={handleHorseSelect}
      />

      <AnalysisTypeDialog
        isOpen={showAnalysisDialog}
        onClose={() => setShowAnalysisDialog(false)}
        onSelect={handleAnalysisSelect}
        horseName={selectedHorse}
      />

      <ExportOptionsDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
      />
    </div>
  );
};

export default ResultComparison;
