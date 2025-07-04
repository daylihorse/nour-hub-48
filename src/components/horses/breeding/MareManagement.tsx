
import { useState } from "react";
import { useMareManagement } from "./hooks/useMareManagement";
import { useMareDialogs } from "./hooks/useMareDialogs";
import { Mare } from "@/types/breeding/mare";
import RecordsProvider from "./records/RecordsProvider";
import MareManagementTabs from "./components/MareManagementTabs";
import MareManagementContent from "./components/MareManagementContent";
import MareManagementDialogs from "./components/MareManagementDialogs";

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
  
  const [activeTab, setActiveTab] = useState("mares");
  
  const {
    editDialog,
    setEditDialog,
    addMareDialog,
    setAddMareDialog,
    vetCheckupDialog,
    setVetCheckupDialog,
    medicalRecordsDialog,
    setMedicalRecordsDialog,
    handleCloseEditDialog,
  } = useMareDialogs();

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
    handleCloseEditDialog();
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

  const handleAddMare = () => {
    setAddMareDialog(true);
  };

  const maresContent = (
    <MareManagementContent
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredMares={filteredMares}
      viewMode={viewMode}
      setViewMode={setViewMode}
      gridSize={gridSize}
      setGridSize={setGridSize}
      onEditMare={handleEditMare}
      onScheduleCheckup={handleScheduleCheckup}
      onViewMedicalRecords={handleViewMedicalRecords}
      onAddMare={handleAddMare}
    />
  );

  return (
    <RecordsProvider>
      <div className="space-y-6">
        <MareManagementTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          maresContent={maresContent}
        />

        <MareManagementDialogs
          editDialog={editDialog}
          onCloseEditDialog={handleCloseEditDialog}
          onSaveMare={handleSaveMare}
          addMareDialog={addMareDialog}
          onSetAddMareDialog={setAddMareDialog}
          vetCheckupDialog={vetCheckupDialog}
          onSetVetCheckupDialog={setVetCheckupDialog}
          medicalRecordsDialog={medicalRecordsDialog}
          onSetMedicalRecordsDialog={setMedicalRecordsDialog}
        />
      </div>
    </RecordsProvider>
  );
};

export default MareManagement;
