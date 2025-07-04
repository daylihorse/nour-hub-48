
import { useState } from "react";
import { 
  SmartTabs, 
  SmartTabsContent, 
  SmartTabsList, 
  SmartTabsTrigger 
} from "@/components/ui/smart-tabs";
import StallionHeader from "./components/StallionHeader";
import StallionFilters from "./components/StallionFilters";
import StallionGrid from "./components/StallionGrid";
import StallionList from "./components/StallionList";
import StallionTable from "./components/StallionTable";
import StallionStats from "./components/StallionStats";
import BreedingRecordsViewSelector from "./components/BreedingRecordsViewSelector";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
import { useStallionManagement } from "./hooks/useStallionManagement";
import { ViewMode, GridSize } from "../records/RecordsViewSelector";

const StallionManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredStallions,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  } = useStallionManagement();

  const [activeTab, setActiveTab] = useState("stallions");
  const [recordsViewMode, setRecordsViewMode] = useState<ViewMode>("grid");
  const [recordsGridSize, setRecordsGridSize] = useState<GridSize>(3);

  const renderView = () => {
    switch (viewMode) {
      case "grid":
        return <StallionGrid stallions={filteredStallions} gridSize={gridSize} />;
      case "list":
        return <StallionList stallions={filteredStallions} />;
      case "table":
        return <StallionTable stallions={filteredStallions} />;
      default:
        return <StallionGrid stallions={filteredStallions} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <SmartTabs value={activeTab} onValueChange={setActiveTab} className="w-full" maxTabsForRegular={4}>
        <SmartTabsList className="mb-8">
          <SmartTabsTrigger value="stallions">
            Stallions
          </SmartTabsTrigger>
          <SmartTabsTrigger value="training">
            Training
          </SmartTabsTrigger>
          <SmartTabsTrigger value="health">
            Health Records
          </SmartTabsTrigger>
          <SmartTabsTrigger value="performance">
            Performance Records
          </SmartTabsTrigger>
        </SmartTabsList>
        
        <SmartTabsContent value="stallions" className="mt-8">
          <div className="space-y-6">
            <StallionHeader 
              viewSelector={
                <BreedingRecordsViewSelector 
                  currentView={viewMode}
                  onViewChange={setViewMode}
                  gridSize={gridSize}
                  onGridSizeChange={setGridSize}
                />
              }
            />
            
            <StallionFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {renderView()}

            <StallionStats />
          </div>
        </SmartTabsContent>
        
        <SmartTabsContent value="training" className="mt-8">
          <TrainingRecords 
            viewMode={recordsViewMode}
            gridSize={recordsGridSize}
            onViewModeChange={setRecordsViewMode}
            onGridSizeChange={setRecordsGridSize}
          />
        </SmartTabsContent>
        
        <SmartTabsContent value="health" className="mt-8">
          <HealthRecords 
            viewMode={recordsViewMode}
            gridSize={recordsGridSize}
            onViewModeChange={setRecordsViewMode}
            onGridSizeChange={setRecordsGridSize}
          />
        </SmartTabsContent>
        
        <SmartTabsContent value="performance" className="mt-8">
          <PerformanceRecords 
            viewMode={recordsViewMode}
            gridSize={recordsGridSize}
            onViewModeChange={setRecordsViewMode}
            onGridSizeChange={setRecordsGridSize}
          />
        </SmartTabsContent>
      </SmartTabs>
    </div>
  );
};

export default StallionManagement;
