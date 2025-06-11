
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'checkup' | 'breeding' | 'health' | 'birth' | null;
  title: string;
}

const ActionDialog = ({ isOpen, onClose, actionType, title }: ActionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              This feature will be implemented in a future update. For now, this is a placeholder dialog.
            </p>
            <div className="space-y-2">
              <p className="text-sm">Action Type: <span className="font-semibold">{actionType}</span></p>
              <p className="text-sm">Title: <span className="font-semibold">{title}</span></p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
