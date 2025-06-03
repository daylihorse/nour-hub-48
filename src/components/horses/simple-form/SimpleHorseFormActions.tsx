
import { Button } from "@/components/ui/button";

interface SimpleHorseFormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const SimpleHorseFormActions = ({ onCancel, isSubmitting }: SimpleHorseFormActionsProps) => {
  return (
    <div className="flex justify-end gap-4 pt-6 border-t">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register Horse"}
      </Button>
    </div>
  );
};

export default SimpleHorseFormActions;
