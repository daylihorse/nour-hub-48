import { useState } from "react";
import MareFilters from "./components/MareFilters";
import MareStats from "./components/MareStats";
import MareHeader from "./components/MareHeader";
import MareGridView from "./components/MareGridView";
import MareListView from "./components/MareListView";
import MareTableView from "./components/MareTableView";
import BreedingRecordsViewSelector from "./components/BreedingRecordsViewSelector";
import EditMareDialog from "./components/EditMareDialog";
import AddMareDialog from "./AddMareDialog";
import VetCheckupDialog from "./VetCheckupDialog";
import MedicalRecordsDialog from "./MedicalRecordsDialog";
import { useMareManagement } from "./hooks/useMareManagement";
import { Mare } from "@/types/breeding/mare";

const MareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  } = useMareManagement();
  
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    mare: Mare | null;
  }>({
    isOpen: false,
    mare: null,
  });

  // Dialog states
  const [addMareDialog, setAddMareDialog] = useState(false);
  const [vetCheckupDialog, setVetCheckupDialog] = useState<{
    open: boolean;
    pregnancyId: string | null;
  }>({ open: false, pregnancyId: null });
  const [medicalRecordsDialog, setMedicalRecordsDialog] = useState<{
    open: boolean;
    mareId: string | null;
    mareName?: string;
  }>({ open: false, mareId: null, mareName: undefined });

  const handleEditMare = (mareId: string) => {
    const mare = filteredMares.find(m => m.id === mareId);
    if (mare) {
      setEditDialog({
        isOpen: true,
        mare,
      });
    }
  };

  const handleSaveMare = (updatedMare: Mare) => {
    updateMare(updatedMare);
    setEditDialog({
      isOpen: false,
      mare: null,
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialog({
      isOpen: false,
      mare: null,
    });
  };

  const handleScheduleCheckup = (mareId: string) => {
    const mare = filteredMares.find(m => m.id === mareId);
    if (mare && mare.status === 'pregnant') {
      setVetCheckupDialog({
        open: true,
        pregnancyId: `PREG_${mareId}`
      });
    } else {
      setVetCheckupDialog({
        open: true,
        pregnancyId: null
      });
    }
  };

  const handleViewMedicalRecords = (mareId: string) => {
    const mare = filteredMares.find(m => m.id === mareId);
    setMedicalRecordsDialog({
      open: true,
      mareId,
      mareName: mare?.horseName
    });
  };

  const renderView = () => {
    const commonProps = {
      mares: filteredMares,
      onEditMare: handleEditMare,
      onScheduleCheckup: handleScheduleCheckup,
      onViewMedicalRecords: handleViewMedicalRecords,
    };

    switch (viewMode) {
      case "grid":
        return <MareGridView {...commonProps} gridSize={gridSize} />;
      case "list":
        return <MareListView {...commonProps} />;
      case "table":
        return <MareTableView {...commonProps} />;
      default:
        return <MareGridView {...commonProps} gridSize={gridSize} />;
    }
  };

  return (
    <div className="space-y-6">
      <MareHeader 
        viewSelector={
          <BreedingRecordsViewSelector 
            currentView={viewMode}
            onViewChange={setViewMode}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
          />
        }
        onAddMare={() => setAddMareDialog(true)}
      />
      
      <MareFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MareStats />

      {renderView()}

      {/* Dialogs */}
      <EditMareDialog
        isOpen={editDialog.isOpen}
        onClose={handleCloseEditDialog}
        mare={editDialog.mare}
        onSave={handleSaveMare}
      />

      <AddMareDialog
        open={addMareDialog}
        onOpenChange={setAddMareDialog}
        onAddNewMare={() => console.log('Add new mare')}
        onSelectExistingMare={(mareId) => console.log('Select existing mare:', mareId)}
      />

      <VetCheckupDialog
        open={vetCheckupDialog.open}
        onOpenChange={(open) => setVetCheckupDialog({ open, pregnancyId: null })}
        pregnancyId={vetCheckupDialog.pregnancyId}
      />

      <MedicalRecordsDialog
        open={medicalRecordsDialog.open}
        onOpenChange={(open) => setMedicalRecordsDialog({ open: false, mareId: null, mareName: undefined })}
        mareId={medicalRecordsDialog.mareId}
        mareName={medicalRecordsDialog.mareName}
      />
    </div>
  );
};

export default MareManagement;
