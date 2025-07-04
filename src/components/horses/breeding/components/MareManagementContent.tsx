
import MareFilters from "./MareFilters";
import MareStats from "./MareStats";
import MareHeader from "./MareHeader";
import MareGridView from "./MareGridView";
import MareListView from "./MareListView";
import MareTableView from "./MareTableView";
import BreedingRecordsViewSelector from "./BreedingRecordsViewSelector";
import { ViewMode } from "./ViewSelector";
import { GridSize } from "./GridSizeSelector";
import { Mare } from "@/types/breeding/mare";

interface MareManagementContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredMares: Mare[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  onEditMare: (mareId: string) => void;
  onScheduleCheckup: (mareId: string) => void;
  onViewMedicalRecords: (mareId: string) => void;
  onAddMare: () => void;
}

const MareManagementContent = ({
  searchTerm,
  setSearchTerm,
  filteredMares,
  viewMode,
  setViewMode,
  gridSize,
  setGridSize,
  onEditMare,
  onScheduleCheckup,
  onViewMedicalRecords,
  onAddMare,
}: MareManagementContentProps) => {
  const renderView = () => {
    const commonProps = {
      mares: filteredMares,
      onEditMare,
      onScheduleCheckup,
      onViewMedicalRecords,
    };

    switch (viewMode) {
      case "grid":
        return <MareGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <MareListView {...commonProps} />;
      case "table":
        return <MareTableView {...commonProps} />;
      default:
        return <MareGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <MareHeader 
        viewSelector={
          <BreedingRecordsViewSelector 
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
        }
        onAddMare={onAddMare}
      />
      
      <MareFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MareStats />

      {renderView()}
    </div>
  );
};

export default MareManagementContent;
