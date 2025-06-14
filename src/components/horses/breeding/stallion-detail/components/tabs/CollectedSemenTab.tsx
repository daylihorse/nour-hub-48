
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useCollectedSemenManagement } from "../../hooks/useCollectedSemenManagement";
import CollectedSemenGridView from "./CollectedSemenGridView";
import CollectedSemenListView from "./CollectedSemenListView";
import CollectedSemenTableView from "./CollectedSemenTableView";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";

interface CollectedSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const CollectedSemenTab = ({ stallionId, onActionClick }: CollectedSemenTabProps) => {
  const { collectedSemen, filters, setFilters, exportData } = useCollectedSemenManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fresh': return 'default';
      case 'Processed': return 'secondary';
      case 'Used': return 'outline';
      default: return 'secondary';
    }
  };

  const renderView = () => {
    const commonProps = {
      collectedSemen,
      onEdit: (record: any) => console.log('Edit record:', record),
      onDelete: (record: any) => console.log('Delete record:', record),
      getStatusColor
    };

    switch (viewMode) {
      case "grid":
        return <CollectedSemenGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <CollectedSemenListView {...commonProps} />;
      case "table":
        return <CollectedSemenTableView {...commonProps} />;
      default:
        return <CollectedSemenGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Collected Semen</h3>
          <p className="text-muted-foreground">Track and manage collected semen samples</p>
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
            onClick={() => onActionClick("new-collection", "Record New Collection")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by collection ID, technician..."
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

export default CollectedSemenTab;
