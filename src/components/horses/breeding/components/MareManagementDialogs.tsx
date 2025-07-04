
import EditMareDialog from "./EditMareDialog";
import AddMareDialog from "../AddMareDialog";
import VetCheckupDialog from "../VetCheckupDialog";
import MedicalRecordsDialog from "../MedicalRecordsDialog";
import { Mare } from "@/types/breeding/mare";

interface MareManagementDialogsProps {
  editDialog: {
    isOpen: boolean;
    mare: Mare | null;
  };
  onCloseEditDialog: () => void;
  onSaveMare: (mare: Mare) => void;
  addMareDialog: boolean;
  onSetAddMareDialog: (open: boolean) => void;
  vetCheckupDialog: {
    open: boolean;
    pregnancyId: string | null;
  };
  onSetVetCheckupDialog: (dialog: { open: boolean; pregnancyId: string | null }) => void;
  medicalRecordsDialog: {
    open: boolean;
    mareId: string | null;
    mareName?: string;
  };
  onSetMedicalRecordsDialog: (dialog: { open: boolean; mareId: string | null; mareName?: string }) => void;
}

const MareManagementDialogs = ({
  editDialog,
  onCloseEditDialog,
  onSaveMare,
  addMareDialog,
  onSetAddMareDialog,
  vetCheckupDialog,
  onSetVetCheckupDialog,
  medicalRecordsDialog,
  onSetMedicalRecordsDialog,
}: MareManagementDialogsProps) => {
  return (
    <>
      <EditMareDialog
        isOpen={editDialog.isOpen}
        onClose={onCloseEditDialog}
        mare={editDialog.mare}
        onSave={onSaveMare}
      />

      <AddMareDialog
        open={addMareDialog}
        onOpenChange={onSetAddMareDialog}
        onAddNewMare={() => console.log('Add new mare')}
        onSelectExistingMare={(mareId) => console.log('Select existing mare:', mareId)}
      />

      <VetCheckupDialog
        open={vetCheckupDialog.open}
        onOpenChange={(open) => onSetVetCheckupDialog({ open, pregnancyId: null })}
        pregnancyId={vetCheckupDialog.pregnancyId}
      />

      <MedicalRecordsDialog
        open={medicalRecordsDialog.open}
        onOpenChange={(open) => onSetMedicalRecordsDialog({ open: false, mareId: null, mareName: undefined })}
        mareId={medicalRecordsDialog.mareId}
        mareName={medicalRecordsDialog.mareName}
      />
    </>
  );
};

export default MareManagementDialogs;
