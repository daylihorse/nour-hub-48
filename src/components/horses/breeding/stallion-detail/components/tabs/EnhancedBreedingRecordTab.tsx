
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useBreedingRecordManagement } from "../../hooks/useBreedingRecordManagement";
import BreedingRecordGridView from "./BreedingRecordGridView";
import BreedingRecordListView from "./BreedingRecordListView";
import BreedingRecordTableView from "./BreedingRecordTableView";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface EnhancedBreedingRecordTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const EnhancedBreedingRecordTab = ({ stallionId, onActionClick }: EnhancedBreedingRecordTabProps) => {
  const { 
    breedingRecords, 
    filters, 
    setFilters, 
    isLoading, 
    exportData 
  } = useBreedingRecordManagement(stallionId);
  
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'Monitoring': return 'outline';
      default: return 'secondary';
    }
  };

  const renderView = () => {
    const commonProps = {
      breedingRecords,
      onEdit: (record: any) => console.log('Edit record:', record),
      onDelete: (record: any) => console.log('Delete record:', record),
      getStatusColor
    };

    switch (viewMode) {
      case "grid":
        return <BreedingRecordGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <BreedingRecordListView {...commonProps} />;
      case "table":
        return <BreedingRecordTableView {...commonProps} />;
      default:
        return <BreedingRecordGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Breeding Records</h3>
          <p className="text-muted-foreground">Track breeding sessions and outcomes</p>
        </div>
        <div className="flex gap-2">
          <ViewSelector
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("new-breeding-record", "Add Breeding Record")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search breeding records..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {renderView()}
    </div>
  );
};

export default EnhancedBreedingRecordTab;
