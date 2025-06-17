import StallionHeader from "./components/StallionHeader";
import StallionFilters from "./components/StallionFilters";
import StallionGrid from "./components/StallionGrid";
import StallionList from "./components/StallionList";
import StallionTable from "./components/StallionTable";
import StallionStats from "./components/StallionStats";
import BreedingRecordsViewSelector from "./components/BreedingRecordsViewSelector";
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
  );
};

export default StallionManagement;
