
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";
import FrozenEmbryoForm from "../../forms/FrozenEmbryoForm";

interface EditFrozenEmbryoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: FrozenEmbryoInventory | null;
  onSave: (record: FrozenEmbryoInventory) => void;
}

const EditFrozenEmbryoDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditFrozenEmbryoDialogProps) => {
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
          <DialogTitle>Edit Frozen Embryo</DialogTitle>
        </DialogHeader>
        <FrozenEmbryoForm
          stallionId={record.stallionId}
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={record}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditFrozenEmbryoDialog;
