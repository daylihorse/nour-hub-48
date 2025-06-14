import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFrozenEmbryoManagement } from "../../hooks/useFrozenEmbryoManagement";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";
import ViewSelector, { ViewMode } from "../../../components/ViewSelector";
import FrozenEmbryoGridView from "./FrozenEmbryoGridView";
import FrozenEmbryoListView from "./FrozenEmbryoListView";
import FrozenEmbryoTableView from "./FrozenEmbryoTableView";
import EditFrozenEmbryoDialog from "./EditFrozenEmbryoDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface FrozenEmbryoInventoryTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const FrozenEmbryoInventoryTab = ({ stallionId, onActionClick }: FrozenEmbryoInventoryTabProps) => {
  const { toast } = useToast();
  const { frozenEmbryos, filters, setFilters, exportData, updateFrozenEmbryo, deleteFrozenEmbryo } = useFrozenEmbryoManagement(stallionId);
  
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FrozenEmbryoInventory | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleEdit = (record: FrozenEmbryoInventory) => {
    setSelectedRecord(record);
    setEditDialogOpen(true);
  };

  const handleDelete = (record: FrozenEmbryoInventory) => {
    setSelectedRecord(record);
    setDeleteDialogOpen(true);
  };

  const handleSaveEdit = async (updatedRecord: FrozenEmbryoInventory) => {
    try {
      await updateFrozenEmbryo(updatedRecord);
      setEditDialogOpen(false);
      setSelectedRecord(null);
      toast({
        title: "Success",
        description: "Frozen embryo record updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update frozen embryo record",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;
    
    try {
      await deleteFrozenEmbryo(selectedRecord.id, selectedRecord);
      setDeleteDialogOpen(false);
      setSelectedRecord(null);
      toast({
        title: "Success",
        description: "Frozen embryo record deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete frozen embryo record",
        variant: "destructive",
      });
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Grade 1': return 'default';
      case 'Grade 2': return 'secondary';
      case 'Grade 3': return 'outline';
      default: return 'secondary';
    }
  };

  const renderContent = () => {
    const commonProps = {
      frozenEmbryos,
      onEdit: handleEdit,
      onDelete: handleDelete,
      getGradeColor
    };

    switch (viewMode) {
      case "grid":
        return <FrozenEmbryoGridView {...commonProps} />;
      case "list":
        return <FrozenEmbryoListView {...commonProps} />;
      case "table":
        return <FrozenEmbryoTableView {...commonProps} />;
      default:
        return <FrozenEmbryoGridView {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Frozen Embryo Inventory</h3>
          <p className="text-muted-foreground">Cryopreserved embryo storage and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm"
            onClick={() => onActionClick("freeze-embryo", "Freeze New Embryo")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Embryo
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by ID, mare name, or tank..."
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
        <ViewSelector 
          currentView={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      {renderContent()}

      <EditFrozenEmbryoDialog
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
        recordType="Frozen Embryo"
      />
    </div>
  );
};

export default FrozenEmbryoInventoryTab;
