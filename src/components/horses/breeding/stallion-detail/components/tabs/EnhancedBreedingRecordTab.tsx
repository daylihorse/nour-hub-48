
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
import BreedingRecordViewSelector, { ViewMode } from "./BreedingRecordViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface EnhancedBreedingRecordTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const EnhancedBreedingRecordTab = ({ stallionId, onActionClick }: EnhancedBreedingRecordTabProps) => {
  const { breedingRecords, filters, setFilters, exportData } = useBreedingRecordManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const renderView = () => {
    const commonProps = {
      records: breedingRecords,
      onViewDetails: (record: any) => console.log('View details:', record),
      onEditRecord: (record: any) => console.log('Edit record:', record),
      onDeleteRecord: (record: any) => console.log('Delete record:', record),
    };

    switch (viewMode) {
      case "grid":
        return (
          <div className={`grid ${getGridColumns()} gap-4`}>
            <BreedingRecordGridView {...commonProps} />
          </div>
        );
      case "list":
        return <div className="text-center py-8 text-muted-foreground">List view coming soon</div>;
      case "table":
        return <div className="text-center py-8 text-muted-foreground">Table view coming soon</div>;
      default:
        return (
          <div className={`grid ${getGridColumns()} gap-4`}>
            <BreedingRecordGridView {...commonProps} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Breeding Records</h3>
          <p className="text-muted-foreground">Complete breeding history and outcomes</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            {viewMode === "grid" && (
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={gridSize === 2 ? "secondary" : "ghost"}
                  className="rounded-none text-xs px-2 py-1"
                  onClick={() => setGridSize(2)}
                  size="sm"
                >
                  2
                </Button>
                <Button
                  variant={gridSize === 3 ? "secondary" : "ghost"}
                  className="rounded-none text-xs px-2 py-1"
                  onClick={() => setGridSize(3)}
                  size="sm"
                >
                  3
                </Button>
                <Button
                  variant={gridSize === 4 ? "secondary" : "ghost"}
                  className="rounded-none text-xs px-2 py-1"
                  onClick={() => setGridSize(4)}
                  size="sm"
                >
                  4
                </Button>
              </div>
            )}
            <BreedingRecordViewSelector
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("new-breeding", "Record New Breeding")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Record
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by mare name, owner, or vet..."
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
