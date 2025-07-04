
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
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

type ViewMode = "grid" | "list" | "table";

const FrozenEmbryoManagement = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
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
        title: t('ui.success'),
        description: "Frozen embryo record updated successfully",
      });
    } catch (error) {
      toast({
        title: t('ui.error'),
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
        title: t('ui.success'),
        description: "Frozen embryo record deleted successfully",
      });
    } catch (error) {
      toast({
        title: t('ui.error'),
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
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h3 className="text-lg font-semibold">{t('breeding.frozenEmbryoManagement')}</h3>
          <p className="text-muted-foreground">{t('breeding.cryopreservedInventory')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            {t('actions.export')}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {t('actions.add')} Embryo
          </Button>
        </div>
      </div>

      <div className={`flex justify-between items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex gap-4 items-center flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="relative flex-1 max-w-sm">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
            <Input
              placeholder={`${t('actions.search')} by ID, mare name, or tank...`}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={isRTL ? 'pr-10 text-right' : 'pl-10'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('actions.filter')}
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
