
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CollectedSemenForm from "../forms/CollectedSemenForm";
import FrozenSemenForm from "../forms/FrozenSemenForm";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  title: string;
  stallionId?: string;
}

const ActionDialog = ({ isOpen, onClose, actionType, title, stallionId = "1" }: ActionDialogProps) => {
  const handleSubmit = async (data: any) => {
    console.log(`Submitting ${actionType}:`, data);
    // In a real app, this would call the appropriate API
    onClose();
  };

  const renderFormContent = () => {
    switch (actionType) {
      case 'collect-semen':
        return (
          <CollectedSemenForm
            stallionId={stallionId}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'freeze-semen':
        return (
          <FrozenSemenForm
            stallionId={stallionId}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        );
      case 'freeze-embryo':
      case 'new-breeding':
        return (
          <div className="p-4">
            <p className="text-muted-foreground">
              {actionType} functionality will be implemented here.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <p className="text-muted-foreground">
              {actionType} functionality will be implemented here.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {renderFormContent()}
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
