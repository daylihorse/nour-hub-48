
import { Button } from "@/components/ui/button";

interface SampleDialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const SampleDialogActions = ({ onCancel, onSave }: SampleDialogActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>
        Save Sample
      </Button>
    </div>
  );
};

export default SampleDialogActions;
