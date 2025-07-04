
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import MareHeatCycleTracking from "./cycles/MareHeatCycleTracking";
import TrainingRecords from "@/components/horses/training/TrainingRecords";
import HealthRecords from "@/components/horses/health/HealthRecords";
import PerformanceRecords from "@/components/horses/performance/PerformanceRecords";
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
  
  const [activeTab, setActiveTab] = useState("mares");
  
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-purple-50 border border-purple-200 p-1 h-12">
          <TabsTrigger 
            value="mares" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Mares
          </TabsTrigger>
          <TabsTrigger 
            value="heat-cycles" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Heat Cycles
          </TabsTrigger>
          <TabsTrigger 
            value="training" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Training
          </TabsTrigger>
          <TabsTrigger 
            value="health" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Health Records
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
          >
            Performance Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mares" className="mt-6">
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
          </div>
        </TabsContent>
        
        <TabsContent value="heat-cycles" className="mt-6">
          <MareHeatCycleTracking />
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <TrainingRecords />
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <HealthRecords />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <PerformanceRecords />
        </TabsContent>
      </Tabs>

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
