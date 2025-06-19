import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, BarChart3, Download, History, FileText, Activity } from "lucide-react";
import HorseSelectionDialog from "./result-comparison/HorseSelectionDialog";
import AnalysisTypeDialog from "./result-comparison/AnalysisTypeDialog";
import HistoricalComparisonTable from "./result-comparison/HistoricalComparisonTable";
import AIAnalysisOverlay from "./result-comparison/AIAnalysisOverlay";
import TrendAnalysisView from "./result-comparison/TrendAnalysisView";
import ExportOptionsDialog from "./result-comparison/ExportOptionsDialog";

const ResultComparison = () => {
  const [selectedHorse, setSelectedHorse] = useState<string | null>(null);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string | null>(null);
  const [currentAnalysisMode, setCurrentAnalysisMode] = useState<'historical' | 'trend' | 'export' | null>(null);
  const [showHorseSelection, setShowHorseSelection] = useState(false);
  const [showAnalysisSelection, setShowAnalysisSelection] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showTrendAnalysis, setShowTrendAnalysis] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const handleHorseSelect = (horseId: string, horseName: string) => {
    setSelectedHorse(horseName);
    setShowHorseSelection(false);
    
    if (currentAnalysisMode === 'historical') {
      setShowAnalysisSelection(true);
    } else if (currentAnalysisMode === 'trend') {
      setShowTrendAnalysis(true);
    }
  };

  const handleAnalysisSelect = (analysisType: string) => {
    setSelectedAnalysisType(analysisType);
    setShowAnalysisSelection(false);
    
    if (currentAnalysisMode === 'historical') {
      setShowComparison(true);
    }
  };

  const handleHistoricalAnalysis = () => {
    setCurrentAnalysisMode('historical');
    setShowHorseSelection(true);
  };

  const handleTrendAnalysis = () => {
    setCurrentAnalysisMode('trend');
    setShowHorseSelection(true);
  };

  const handleExportOptions = () => {
    setCurrentAnalysisMode('export');
    setShowExportDialog(true);
  };

  const resetSelection = () => {
    setSelectedHorse(null);
    setSelectedAnalysisType(null);
    setCurrentAnalysisMode(null);
    setShowComparison(false);
    setShowTrendAnalysis(false);
    setShowExportDialog(false);
    setShowAIAnalysis(false);
  };

  // Historical Analysis View
  if (showComparison && currentAnalysisMode === 'historical') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Historical Test Comparison</h2>
            <p className="text-muted-foreground">
              Comparing {selectedAnalysisType} results for {selectedHorse}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowAIAnalysis(true)}>
              <Activity className="h-4 w-4 mr-2" />
              AI Analysis
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={resetSelection}>
              New Comparison
            </Button>
          </div>
        </div>
        
        <HistoricalComparisonTable 
          horse={selectedHorse!}
          analysisType={selectedAnalysisType!}
        />
        
        {showAIAnalysis && (
          <AIAnalysisOverlay 
            horse={selectedHorse!}
            analysisType={selectedAnalysisType!}
            onClose={() => setShowAIAnalysis(false)}
          />
        )}
      </div>
    );
  }

  // Trend Analysis View
  if (showTrendAnalysis && currentAnalysisMode === 'trend') {
    return (
      <TrendAnalysisView 
        horse={selectedHorse!}
        onBack={resetSelection}
      />
    );
  }

  // Main Dashboard View
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Result Comparison</h2>
        <p className="text-muted-foreground">
          Compare historical test results and analyze trends for comprehensive health insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleHistoricalAnalysis}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <History className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Historical Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Compare test results across different time periods to identify patterns and changes
            </p>
            <Button className="w-full">
              Start Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleTrendAnalysis}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Visualize health trends and parameter changes over time with detailed charts
            </p>
            <Button className="w-full">
              View Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleExportOptions}>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Generate comprehensive reports and export data in various formats
            </p>
            <Button className="w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Comparisons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Thunder - Blood Chemistry</p>
                  <p className="text-sm text-muted-foreground">3 months comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Bella - Complete Blood Count</p>
                  <p className="text-sm text-muted-foreground">6 months comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Shadow - Urinalysis</p>
                  <p className="text-sm text-muted-foreground">1 year comparison</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Horses Analyzed</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comparisons This Month</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trends Identified</span>
                <span className="font-semibold">7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reports Generated</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <HorseSelectionDialog 
        isOpen={showHorseSelection}
        onClose={() => setShowHorseSelection(false)}
        onHorseSelect={handleHorseSelect}
      />

      <AnalysisTypeDialog 
        isOpen={showAnalysisSelection}
        onClose={() => setShowAnalysisSelection(false)}
        onAnalysisSelect={handleAnalysisSelect}
        horse={selectedHorse}
      />

      <ExportOptionsDialog 
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
      />
    </div>
  );
};

export default ResultComparison;
