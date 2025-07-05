
import { useState } from "react";
import { useGeldingManagement } from "./hooks/useGeldingManagement";
import { useGeldingDialogs } from "./hooks/useGeldingDialogs";
import { Horse } from "@/types/horse";
import RecordsProvider from "./records/RecordsProvider";
import GeldingManagementTabs from "./components/GeldingManagementTabs";
import GeldingManagementContent from "./components/GeldingManagementContent";
import GeldingManagementDialogs from "./components/GeldingManagementDialogs";

const GeldingManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredGeldings,
    updateGelding,
    viewMode,
    setViewMode,
    gridSize,
    setGridSize,
  } = useGeldingManagement();
  
  const [activeTab, setActiveTab] = useState("geldings");
  
  const {
    editDialog,
    setEditDialog,
    addGeldingDialog,
    setAddGeldingDialog,
    vetCheckupDialog,
    setVetCheckupDialog,
    medicalRecordsDialog,
    setMedicalRecordsDialog,
    handleCloseEditDialog,
  } = useGeldingDialogs();

  const handleEditGelding = (geldingId: string) => {
    const gelding = filteredGeldings.find(g => g.id === geldingId);
    if (gelding) {
      setEditDialog({
        isOpen: true,
        gelding,
      });
    }
  };

  const handleSaveGelding = (updatedGelding: Horse) => {
    updateGelding(updatedGelding);
    handleCloseEditDialog();
  };

  const handleScheduleCheckup = (geldingId: string) => {
    setVetCheckupDialog({
      open: true,
      horseId: geldingId
    });
  };

  const handleViewMedicalRecords = (geldingId: string) => {
    const gelding = filteredGeldings.find(g => g.id === geldingId);
    setMedicalRecordsDialog({
      open: true,
      horseId: geldingId,
      horseName: gelding?.name
    });
  };

  const handleAddGelding = () => {
    setAddGeldingDialog(true);
  };

  const geldingsContent = (
    <GeldingManagementContent
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredGeldings={filteredGeldings}
      viewMode={viewMode}
      setViewMode={setViewMode}
      gridSize={gridSize}
      setGridSize={setGridSize}
      onEditGelding={handleEditGelding}
      onScheduleCheckup={handleScheduleCheckup}
      onViewMedicalRecords={handleViewMedicalRecords}
      onAddGelding={handleAddGelding}
    />
  );

  return (
    <RecordsProvider>
      <div className="space-y-6">
        <GeldingManagementTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          geldingsContent={geldingsContent}
        />

        <GeldingManagementDialogs
          editDialog={editDialog}
          onCloseEditDialog={handleCloseEditDialog}
          onSaveGelding={handleSaveGelding}
          addGeldingDialog={addGeldingDialog}
          onSetAddGeldingDialog={setAddGeldingDialog}
          vetCheckupDialog={vetCheckupDialog}
          onSetVetCheckupDialog={setVetCheckupDialog}
          medicalRecordsDialog={medicalRecordsDialog}
          onSetMedicalRecordsDialog={setMedicalRecordsDialog}
        />
      </div>
    </RecordsProvider>
  );
};

export default GeldingManagement;
