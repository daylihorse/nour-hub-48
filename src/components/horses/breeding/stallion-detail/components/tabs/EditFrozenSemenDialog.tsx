
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";
import FrozenSemenForm from "../../forms/FrozenSemenForm";

interface EditFrozenSemenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: FrozenSemenInventory | null;
  onSave: (record: FrozenSemenInventory) => void;
}

const EditFrozenSemenDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditFrozenSemenDialogProps) => {
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
          <DialogTitle>Edit Frozen Semen</DialogTitle>
        </DialogHeader>
        <FrozenSemenForm
          stallionId={record.stallionId}
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={record}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFrozenSemenDialog;
