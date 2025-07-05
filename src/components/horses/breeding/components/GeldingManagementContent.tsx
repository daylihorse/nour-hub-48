
import GeldingFilters from "./GeldingFilters";
import GeldingStats from "./GeldingStats";
import GeldingHeader from "./GeldingHeader";
import GeldingGridView from "./GeldingGridView";
import GeldingListView from "./GeldingListView";
import GeldingTableView from "./GeldingTableView";
import BreedingRecordsViewSelector from "./BreedingRecordsViewSelector";
import { ViewMode } from "./ViewSelector";
import { GridSize } from "./GridSizeSelector";
import { Horse } from "@/types/horse-unified";

interface GeldingManagementContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredGeldings: Horse[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  onEditGelding: (geldingId: string) => void;
  onScheduleCheckup: (geldingId: string) => void;
  onViewMedicalRecords: (geldingId: string) => void;
  onAddGelding: () => void;
}

const GeldingManagementContent = ({
  searchTerm,
  setSearchTerm,
  filteredGeldings,
  viewMode,
  setViewMode,
  gridSize,
  setGridSize,
  onEditGelding,
  onScheduleCheckup,
  onViewMedicalRecords,
  onAddGelding,
}: GeldingManagementContentProps) => {
  const renderView = () => {
    const commonProps = {
      geldings: filteredGeldings,
      onEditGelding,
      onScheduleCheckup,
      onViewMedicalRecords,
    };

    switch (viewMode) {
      case "grid":
        return <GeldingGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <GeldingListView {...commonProps} />;
      case "table":
        return <GeldingTableView {...commonProps} />;
      default:
        return <GeldingGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <GeldingHeader 
        viewSelector={
          <BreedingRecordsViewSelector 
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
        }
        onAddGelding={onAddGelding}
      />
      
      <GeldingFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <GeldingStats />

      {renderView()}
    </div>
  );
};

export default GeldingManagementContent;
