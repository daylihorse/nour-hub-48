
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";
import FrozenSemenGridView from "./FrozenSemenGridView";
import FrozenSemenListView from "./FrozenSemenListView";
import FrozenSemenTableView from "./FrozenSemenTableView";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  const { frozenSemen, filters, setFilters, exportData } = useFrozenSemenManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Grade A': return 'default';
      case 'Grade B': return 'secondary';
      case 'Grade C': return 'outline';
      default: return 'secondary';
    }
  };

  const renderView = () => {
    const commonProps = {
      frozenSemen,
      onEdit: (record: any) => console.log('Edit record:', record),
      onDelete: (record: any) => console.log('Delete record:', record),
      getQualityColor
    };

    switch (viewMode) {
      case "grid":
        return <FrozenSemenGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <FrozenSemenListView {...commonProps} />;
      case "table":
        return <FrozenSemenTableView {...commonProps} />;
      default:
        return <FrozenSemenGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Semen Inventory</h3>
          <p className="text-muted-foreground">Manage frozen semen storage and tracking</p>
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
            onClick={() => onActionClick("new-frozen-semen", "Add Frozen Semen")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Inventory
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by ID, tank, location..."
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

export default FrozenSemenInventoryTab;
