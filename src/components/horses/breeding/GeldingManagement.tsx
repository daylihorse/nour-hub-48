
import { useState } from "react";
import { useGeldings } from "@/hooks/useGeldings";
import { useGeldingDialogs } from "./hooks/useGeldingDialogs";
import { Horse } from "@/types/horse-unified";
import RecordsProvider from "./records/RecordsProvider";
import GeldingManagementTabs from "./components/GeldingManagementTabs";
import GeldingManagementContent from "./components/GeldingManagementContent";
import GeldingManagementDialogs from "./components/GeldingManagementDialogs";

const GeldingManagement = () => {
  const { data: geldings = [], isLoading, error } = useGeldings();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const [gridSize, setGridSize] = useState<3>(3);
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

  // Filter geldings based on search term
  const filteredGeldings = geldings.filter(gelding => 
    gelding.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gelding.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gelding.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditGelding = (geldingId: string) => {
    const gelding = filteredGeldings.find(g => g.id === geldingId);
    if (gelding) {
      setEditDialog({
        isOpen: true,
        gelding: gelding,
      });
    }
  };

  const handleSaveGelding = (updatedGelding: Horse) => {
    // TODO: Implement save functionality with Supabase
    console.log('Save gelding:', updatedGelding);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading geldings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <p>Error loading geldings: {error.message}</p>
        </div>
      </div>
    );
  }

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
