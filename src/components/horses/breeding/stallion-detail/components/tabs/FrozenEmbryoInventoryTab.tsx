
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useFrozenEmbryoManagement } from "../../hooks/useFrozenEmbryoManagement";
import FrozenEmbryoGridView from "./FrozenEmbryoGridView";
import FrozenEmbryoListView from "./FrozenEmbryoListView";
import FrozenEmbryoTableView from "./FrozenEmbryoTableView";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenEmbryoInventoryTab = ({ stallionId, onActionClick }: FrozenEmbryoInventoryTabProps) => {
  const { frozenEmbryos, filters, setFilters, exportData } = useFrozenEmbryoManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Grade 1': return 'default';
      case 'Grade 2': return 'secondary';
      case 'Grade 3': return 'outline';
      default: return 'secondary';
    }
  };

  const renderView = () => {
    const commonProps = {
      frozenEmbryos,
      onEdit: (record: any) => console.log('Edit record:', record),
      onDelete: (record: any) => console.log('Delete record:', record),
      getGradeColor
    };

    switch (viewMode) {
      case "grid":
        return <FrozenEmbryoGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <FrozenEmbryoListView {...commonProps} />;
      case "table":
        return <FrozenEmbryoTableView {...commonProps} />;
      default:
        return <FrozenEmbryoGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Embryo Inventory</h3>
          <p className="text-muted-foreground">Manage frozen embryo storage and tracking</p>
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
            onClick={() => onActionClick("new-frozen-embryo", "Add Frozen Embryo")}
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
            placeholder="Search by ID, mare, tank..."
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

export default FrozenEmbryoInventoryTab;
