
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFrozenSemenManagement } from "../../hooks/useFrozenSemenManagement";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";
import BreedingRecordsViewSelector from "../../../components/BreedingRecordsViewSelector";
import { GridSize } from "../../../components/GridSizeSelector";
import FrozenSemenGridView from "./FrozenSemenGridView";
import FrozenSemenListView from "./FrozenSemenListView";
import FrozenSemenTableView from "./FrozenSemenTableView";
import EditFrozenSemenDialog from "./EditFrozenSemenDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

type ViewMode = "grid" | "list" | "table";

interface FrozenSemenInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenSemenInventoryTab = ({ stallionId, onActionClick }: FrozenSemenInventoryTabProps) => {
  const { toast } = useToast();
  const { frozenSemen, filters, setFilters, exportData, updateFrozenSemen, deleteFrozenSemen } = useFrozenSemenManagement(stallionId);
  
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FrozenSemenInventory | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleEdit = (record: FrozenSemenInventory) => {
    setSelectedRecord(record);
    setEditDialogOpen(true);
  };

  const handleDelete = (record: FrozenSemenInventory) => {
    setSelectedRecord(record);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = async (updatedRecord: FrozenSemenInventory) => {
    try {
      await updateFrozenSemen(updatedRecord.id, updatedRecord);
      setEditDialogOpen(false);
      setSelectedRecord(null);
      toast({
        title: "Success",
        description: "Frozen semen record updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update frozen semen record",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;
    
    try {
      await deleteFrozenSemen(selectedRecord.id);
      setDeleteDialogOpen(false);
      setSelectedRecord(null);
      toast({
        title: "Success",
        description: "Frozen semen record deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete frozen semen record",
        variant: "destructive",
      });
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

  const renderContent = () => {
    const commonProps = {
      frozenSemen,
      onEdit: handleEdit,
      onDelete: handleDelete,
      getQualityColor
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
          <p className="text-muted-foreground">Cryopreserved semen storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("freeze-semen", "Freeze New Semen")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Semen
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by ID, tank, or location..."
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
        <BreedingRecordsViewSelector 
          currentView={viewMode}
          onViewChange={setViewMode}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
        />
      </div>

      {renderContent()}

      <EditFrozenSemenDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        recordId={selectedRecord?.id}
        recordType="Frozen Semen"
      />
    </div>
  );
};

export default FrozenSemenInventoryTab;
