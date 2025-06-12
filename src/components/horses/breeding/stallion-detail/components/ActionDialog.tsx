
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: string;
  title: string;
}

const ActionDialog = ({ isOpen, onClose, actionType, title }: ActionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-muted-foreground">
            {actionType} functionality will be implemented here.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
