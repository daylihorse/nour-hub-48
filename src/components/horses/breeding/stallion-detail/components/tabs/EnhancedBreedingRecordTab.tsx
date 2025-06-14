
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
import { BreedingRecord } from "@/types/breeding/stallion-detail";
import BreedingRecordViewSelector, { ViewMode } from "./BreedingRecordViewSelector";
import BreedingRecordGridView from "./BreedingRecordGridView";
import BreedingRecordListView from "./BreedingRecordListView";
import BreedingRecordTableView from "./BreedingRecordTableView";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface EnhancedBreedingRecordTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const EnhancedBreedingRecordTab = ({ stallionId, onActionClick }: EnhancedBreedingRecordTabProps) => {
  const { breedingRecords, filters, setFilters, exportData } = useBreedingRecordManagement(stallionId);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRecordForDelete, setSelectedRecordForDelete] = useState<BreedingRecord | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, searchTerm: value });
  };

  const handleEditRecord = (record: BreedingRecord) => {
    onActionClick("edit-breeding", `Edit Breeding Record ${record.id}`);
  };

  const handleViewDetails = (record: BreedingRecord) => {
    onActionClick("view-breeding", `Breeding Record Details ${record.id}`);
  };

  const handleDeleteRecord = (record: BreedingRecord) => {
    setSelectedRecordForDelete(record);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedRecordForDelete) {
      console.log('Deleting record:', selectedRecordForDelete.id);
      setShowDeleteDialog(false);
      setSelectedRecordForDelete(null);
    }
  };

  const renderView = () => {
    const commonProps = {
      records: breedingRecords,
      onViewDetails: handleViewDetails,
      onEditRecord: handleEditRecord,
      onDeleteRecord: handleDeleteRecord,
    };

    switch (viewMode) {
      case "grid":
        return <BreedingRecordGridView {...commonProps} />;
      case "list":
        return <BreedingRecordListView {...commonProps} />;
      case "table":
        return <BreedingRecordTableView {...commonProps} />;
      default:
        return <BreedingRecordGridView {...commonProps} />;
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
          <BreedingRecordViewSelector
            currentView={viewMode}
            onViewChange={setViewMode}
          />
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

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        recordId={selectedRecordForDelete?.id}
        recordType="breeding record"
      />
    </div>
  );
};

export default EnhancedBreedingRecordTab;
