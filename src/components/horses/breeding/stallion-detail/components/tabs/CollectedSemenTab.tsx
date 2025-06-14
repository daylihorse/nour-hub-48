
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TestTube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectedSemen } from "@/types/breeding/stallion-detail";
import { ViewMode } from "./BreedingRecordViewSelector";
import BreedingRecordViewSelector from "./BreedingRecordViewSelector";
import CollectedSemenGridView from "./CollectedSemenGridView";
import CollectedSemenListView from "./CollectedSemenListView";
import CollectedSemenTableView from "./CollectedSemenTableView";
import EditCollectedSemenDialog from "./EditCollectedSemenDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useCollectedSemenManagement } from "../../hooks/useCollectedSemenManagement";
import CollectedSemenForm from "../../forms/CollectedSemenForm";
import StallionDetailFilters from "../filters/StallionDetailFilters";
import { useToast } from "@/hooks/use-toast";

interface CollectedSemenTabProps {
  stallionId: string;
  onActionClick: (action: string, title: string) => void;
}

const CollectedSemenTab = ({ stallionId, onActionClick }: CollectedSemenTabProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editRecord, setEditRecord] = useState<CollectedSemen | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<CollectedSemen | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>("grid");
  const { toast } = useToast();
  
  const {
    collectedSemen,
    filters,
    setFilters,
    isLoading,
    addCollectedSemen,
    updateCollectedSemen,
    deleteCollectedSemen,
    exportData
  } = useCollectedSemenManagement(stallionId);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      await addCollectedSemen(data);
      setShowForm(false);
      toast({
        title: "Success",
        description: "Semen collection record created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create semen collection record.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (record: CollectedSemen) => {
    setEditRecord(record);
  };

  const handleEditSave = async (updatedRecord: CollectedSemen) => {
    try {
      await updateCollectedSemen(updatedRecord.id, updatedRecord);
      setEditRecord(null);
      toast({
        title: "Success",
        description: "Semen collection record updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update semen collection record.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (record: CollectedSemen) => {
    setDeleteRecord(record);
  };

  const handleDeleteConfirm = async () => {
    if (deleteRecord) {
      try {
        await deleteCollectedSemen(deleteRecord.id);
        setDeleteRecord(null);
        toast({
          title: "Success",
          description: "Semen collection record deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete semen collection record.",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'Fresh': return 'default';
      case 'Used': return 'secondary';
      case 'Frozen': return 'outline';
      case 'Discarded': return 'destructive';
      default: return 'secondary';
    }
  };

  const filterOptions = {
    status: ['Fresh', 'Used', 'Frozen', 'Discarded'],
    quality: ['Excellent', 'Good', 'Fair', 'Poor'],
    technician: ['Dr. Smith', 'Dr. Johnson', 'Dr. Wilson']
  };

  const renderContent = () => {
    if (collectedSemen.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <TestTube className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Collections Found</h3>
            <p className="text-muted-foreground mb-4">
              No semen collection records found. Add your first collection to get started.
            </p>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Collection
            </Button>
          </CardContent>
        </Card>
      );
    }

    const viewProps = {
      collectedSemen,
      onEdit: handleEdit,
      onDelete: handleDelete,
      getStatusColor
    };

    switch (currentView) {
      case "grid":
        return <CollectedSemenGridView {...viewProps} />;
      case "list":
        return <CollectedSemenListView {...viewProps} />;
      case "table":
        return <CollectedSemenTableView {...viewProps} />;
      default:
        return <CollectedSemenGridView {...viewProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Collected Semen</h3>
          <p className="text-muted-foreground">Fresh semen collections and quality data</p>
        </div>
        <div className="flex gap-2">
          <BreedingRecordViewSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            New Collection
          </Button>
        </div>
      </div>

      <StallionDetailFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
      />

      {renderContent()}

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {collectedSemen.length} records
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('excel')}>
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('pdf')}>
            Export PDF
          </Button>
        </div>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Semen Collection</DialogTitle>
          </DialogHeader>
          <CollectedSemenForm
            stallionId={stallionId}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <EditCollectedSemenDialog
        isOpen={!!editRecord}
        onClose={() => setEditRecord(null)}
        record={editRecord}
        onSave={handleEditSave}
      />

      <DeleteConfirmationDialog
        open={!!deleteRecord}
        onOpenChange={(open) => !open && setDeleteRecord(null)}
        onConfirm={handleDeleteConfirm}
        recordId={deleteRecord?.id}
        recordType="semen collection"
      />
    </div>
  );
};

export default CollectedSemenTab;
