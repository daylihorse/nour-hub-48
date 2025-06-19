
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Activity } from "lucide-react";
import HorseSelectionDialog from "./result-comparison/HorseSelectionDialog";
import AnalysisTypeDialog from "./result-comparison/AnalysisTypeDialog";
import HistoricalComparisonTable from "./result-comparison/HistoricalComparisonTable";
import AIAnalysisOverlay from "./result-comparison/AIAnalysisOverlay";
import TrendAnalysisView from "./result-comparison/TrendAnalysisView";
import ExportOptionsDialog from "./result-comparison/ExportOptionsDialog";
import ResultComparisonDashboard from "./result-comparison/ResultComparisonDashboard";

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
    <div>
      <ResultComparisonDashboard 
        onHistoricalAnalysis={handleHistoricalAnalysis}
        onTrendAnalysis={handleTrendAnalysis}
        onExportOptions={handleExportOptions}
      />

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
