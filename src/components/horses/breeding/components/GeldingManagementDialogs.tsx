
import EditGeldingDialog from "./EditGeldingDialog";
import AddGeldingDialog from "./AddGeldingDialog";
import VetCheckupDialog from "../VetCheckupDialog";
import MedicalRecordsDialog from "../MedicalRecordsDialog";
import { Horse } from "@/types/horse";

interface GeldingManagementDialogsProps {
  editDialog: {
    isOpen: boolean;
    gelding: Horse | null;
  };
  onCloseEditDialog: () => void;
  onSaveGelding: (gelding: Horse) => void;
  addGeldingDialog: boolean;
  onSetAddGeldingDialog: (open: boolean) => void;
  vetCheckupDialog: {
    open: boolean;
    horseId: string | null;
  };
  onSetVetCheckupDialog: (dialog: { open: boolean; horseId: string | null }) => void;
  medicalRecordsDialog: {
    open: boolean;
    horseId: string | null;
    horseName?: string;
  };
  onSetMedicalRecordsDialog: (dialog: { open: boolean; horseId: string | null; horseName?: string }) => void;
}

const GeldingManagementDialogs = ({
  editDialog,
  onCloseEditDialog,
  onSaveGelding,
  addGeldingDialog,
  onSetAddGeldingDialog,
  vetCheckupDialog,
  onSetVetCheckupDialog,
  medicalRecordsDialog,
  onSetMedicalRecordsDialog,
}: GeldingManagementDialogsProps) => {
  return (
    <>
      <EditGeldingDialog
        isOpen={editDialog.isOpen}
        onClose={onCloseEditDialog}
        gelding={editDialog.gelding}
        onSave={onSaveGelding}
      />

      <AddGeldingDialog
        open={addGeldingDialog}
        onOpenChange={onSetAddGeldingDialog}
        onAddNewGelding={() => console.log('Add new gelding')}
        onSelectExistingGelding={(geldingId) => console.log('Select existing gelding:', geldingId)}
      />

      <VetCheckupDialog
        open={vetCheckupDialog.open}
        onOpenChange={(open) => onSetVetCheckupDialog({ open, horseId: null })}
        pregnancyId={null}
      />

      <MedicalRecordsDialog
        open={medicalRecordsDialog.open}
        onOpenChange={(open) => onSetMedicalRecordsDialog({ open: false, horseId: null, horseName: undefined })}
        mareId={medicalRecordsDialog.horseId}
        mareName={medicalRecordsDialog.horseName}
      />
    </>
  );
};

export default GeldingManagementDialogs;
