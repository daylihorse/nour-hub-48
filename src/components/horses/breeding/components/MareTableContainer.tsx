
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import MareViewToggle from "./MareViewToggle";
import MareGridView from "./MareGridView";
import MareListView from "./MareListView";
import MareTableView from "./MareTableView";
import AddMareDialog from "../AddMareDialog";
import VetCheckupDialog from "../VetCheckupDialog";
import MedicalRecordsDialog from "../MedicalRecordsDialog";

interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}

interface MareTableContainerProps {
  mares: Mare[];
  onEditMare?: (mareId: string) => void;
}

const MareTableContainer = ({ mares, onEditMare }: MareTableContainerProps) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  
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

  const handleAddMare = () => {
    setAddMareDialog(true);
  };

  const handleAddNewMare = () => {
    // Navigate to horse registration
    navigate('/dashboard/horses', { 
      state: { 
        activeTab: 'horses',
        showAddForm: true 
      } 
    });
  };

  const handleSelectExistingMare = (mareId: string) => {
    console.log('Adding existing mare to breeding program:', mareId);
    // TODO: Implement adding existing mare to breeding program
  };

  const handleExport = () => {
    console.log('Export mare data');
    // TODO: Implement export functionality
  };

  const handleScheduleCheckup = (mareId: string) => {
    const mare = mares.find(m => m.id === mareId);
    if (mare && mare.status === 'pregnant') {
      // For pregnant mares, use pregnancy ID (mock)
      setVetCheckupDialog({
        open: true,
        pregnancyId: `PREG_${mareId}`
      });
    } else {
      // For non-pregnant mares, open general checkup
      setVetCheckupDialog({
        open: true,
        pregnancyId: null
      });
    }
  };

  const handleViewMedicalRecords = (mareId: string) => {
    const mare = mares.find(m => m.id === mareId);
    setMedicalRecordsDialog({
      open: true,
      mareId,
      mareName: mare?.horseName
    });
  };

  const renderContent = () => {
    const commonProps = {
      mares,
      onEditMare,
      onScheduleCheckup: handleScheduleCheckup,
      onViewMedicalRecords: handleViewMedicalRecords,
    };

    switch (viewMode) {
      case 'grid':
        return <MareGridView {...commonProps} />;
      case 'list':
        return <MareListView {...commonProps} />;
      case 'table':
        return <MareTableView {...commonProps} />;
      default:
        return <MareGridView {...commonProps} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with view toggle and actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Mare Management</h2>
        <div className="flex items-center gap-4">
          <MareViewToggle currentView={viewMode} onViewChange={setViewMode} />
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleAddMare} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Mare
            </Button>
          </div>
        </div>
      </div>

      {/* Mare content based on view mode */}
      {renderContent()}

      {/* Dialogs */}
      <AddMareDialog
        open={addMareDialog}
        onOpenChange={setAddMareDialog}
        onAddNewMare={handleAddNewMare}
        onSelectExistingMare={handleSelectExistingMare}
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

export default MareTableContainer;
