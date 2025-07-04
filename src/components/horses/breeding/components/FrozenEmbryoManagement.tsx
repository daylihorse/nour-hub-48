
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFrozenEmbryoManagement } from "../stallion-detail/hooks/useFrozenEmbryoManagement";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";
import BreedingRecordsViewSelector from "./BreedingRecordsViewSelector";
import { GridSize } from "./GridSizeSelector";
import FrozenEmbryoGridView from "../stallion-detail/components/tabs/FrozenEmbryoGridView";
import FrozenEmbryoListView from "../stallion-detail/components/tabs/FrozenEmbryoListView";
import FrozenEmbryoTableView from "../stallion-detail/components/tabs/FrozenEmbryoTableView";
import EditFrozenEmbryoDialog from "../stallion-detail/components/tabs/EditFrozenEmbryoDialog";
import DeleteConfirmationDialog from "../stallion-detail/components/tabs/DeleteConfirmationDialog";

type ViewMode = "grid" | "list" | "table";

const FrozenEmbryoManagement = () => {
  const { toast } = useToast();
  const { frozenEmbryos, filters, setFilters, exportData, updateFrozenEmbryo, deleteFrozenEmbryo } = useFrozenEmbryoManagement("mare-management");
  
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridSize, setGridSize] = useState<GridSize>(3);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FrozenEmbryoInventory | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleView = (record: FrozenEmbryoInventory) => {
    // Handle view action
    console.log("View record:", record);
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
      await updateFrozenEmbryo(updatedRecord.id, updatedRecord);
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
      await deleteFrozenEmbryo(selectedRecord.id);
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
      onView: handleView,
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
          <h3 className="text-lg font-semibold">Frozen Embryo Management</h3>
          <p className="text-muted-foreground">Manage cryopreserved embryo inventory and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
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
        <BreedingRecordsViewSelector 
          currentView={viewMode}
          onViewChange={setViewMode}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
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

export default FrozenEmbryoManagement;
