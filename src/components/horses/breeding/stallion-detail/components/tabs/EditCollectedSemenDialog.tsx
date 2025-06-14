
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectedSemen } from "@/types/breeding/stallion-detail";
import CollectedSemenForm from "../../forms/CollectedSemenForm";

interface EditCollectedSemenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: CollectedSemen | null;
  onSave: (record: CollectedSemen) => void;
}

const EditCollectedSemenDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditCollectedSemenDialogProps) => {
  const handleSubmit = async (data: any) => {
    if (record) {
      const updatedRecord = { ...record, ...data };
      onSave(updatedRecord);
    }
  };

  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Semen Collection</DialogTitle>
        </DialogHeader>
        <CollectedSemenForm
          stallionId={record.stallionId}
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={record}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectedSemenDialog;
