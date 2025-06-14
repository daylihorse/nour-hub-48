
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Snowflake, 
  Plus,
  Filter,
  Search,
  Download
} from "lucide-react";
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";
import ViewModeSelector, { ViewMode } from "./ViewModeSelector";
import FrozenSemenGridView from "./FrozenSemenGridView";
import FrozenSemenListView from "./FrozenSemenListView";
import FrozenSemenTableView from "./FrozenSemenTableView";
import EditFrozenSemenDialog from "./EditFrozenSemenDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface EnhancedFrozenSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const EnhancedFrozenSemenTab = ({ stallionId, onActionClick }: EnhancedFrozenSemenTabProps) => {
  const { frozenSemen, filters, setFilters, exportData } = useFrozenSemenManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FrozenSemenInventory | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleEdit = (record: FrozenSemenInventory) => {
    setSelectedRecord(record);
    setShowEditDialog(true);
  };

  const handleDelete = (record: FrozenSemenInventory) => {
    setSelectedRecord(record);
    setShowDeleteDialog(true);
  };

  const handleSave = (updatedRecord: FrozenSemenInventory) => {
    console.log('Saving frozen semen record:', updatedRecord);
    setShowEditDialog(false);
    setSelectedRecord(null);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      console.log('Deleting frozen semen record:', selectedRecord.id);
      setShowDeleteDialog(false);
      setSelectedRecord(null);
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Grade A': return 'default' as const;
      case 'Grade B': return 'secondary' as const;
      case 'Grade C': return 'outline' as const;
      default: return 'secondary' as const;
    }
  };

  const renderView = () => {
    const commonProps = {
      frozenSemen,
      onEdit: handleEdit,
      onDelete: handleDelete,
      getQualityColor,
    };

    switch (viewMode) {
      case "grid":
        return <FrozenSemenGridView {...commonProps} />;
      case "list":
        return <FrozenSemenListView {...commonProps} />;
      case "table":
        return <FrozenSemenTableView {...commonProps} />;
      default:
        return <FrozenSemenGridView {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Semen Inventory</h3>
          <p className="text-muted-foreground">Manage frozen semen storage and quality tracking</p>
        </div>
        <div className="flex gap-2">
          <ViewModeSelector
            currentView={viewMode}
            onViewChange={setViewMode}
          />
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("frozen-semen", "Add Frozen Semen")}
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
            placeholder="Search by tank, location, or batch..."
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

      <EditFrozenSemenDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        record={selectedRecord}
        onSave={handleSave}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        recordId={selectedRecord?.id}
        recordType="frozen semen record"
      />
    </div>
  );
};

export default EnhancedFrozenSemenTab;
