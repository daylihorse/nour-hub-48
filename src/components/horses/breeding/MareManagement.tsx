
import { useState } from "react";
import MareFilters from "./components/MareFilters";
import MareStats from "./components/MareStats";
import MareTableContainer from "./components/MareTableContainer";
import EditMareDialog from "./components/EditMareDialog";
import { useMareManagement } from "./hooks/useMareManagement";

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

const MareManagement = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredMares,
    updateMare,
  } = useMareManagement();
  
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    mare: Mare | null;
  }>({
    isOpen: false,
    mare: null,
  });

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

  return (
    <div className="space-y-6">
      <MareFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MareStats />

      <MareTableContainer 
        mares={filteredMares} 
        onEditMare={handleEditMare}
      />

      <EditMareDialog
        isOpen={editDialog.isOpen}
        onClose={handleCloseEditDialog}
        mare={editDialog.mare}
        onSave={handleSaveMare}
      />
    </div>
  );
};

export default MareManagement;
