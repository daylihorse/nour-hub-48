
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200 p-1 h-12">
          <TabsTrigger 
            value="stallions" 
            className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
          >
            Stallions
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
          >
            Training
          </TabsTrigger>
          <TabsTrigger 
            value="health" 
            className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
          >
            Health Records
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium"
          >
            Performance Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stallions" className="mt-6">
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
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <TrainingRecords />
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <HealthRecords />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <PerformanceRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StallionManagement;
