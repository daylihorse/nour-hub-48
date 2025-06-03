
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormStage } from "@/types/horse";

interface FormNavigationButtonsProps {
  currentStage: number;
  formStages: FormStage[];
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormNavigationButtons = ({
  currentStage,
  formStages,
  onPrevious,
  onNext,
  onCancel,
  onSubmit
}: FormNavigationButtonsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {currentStage > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>

      <div className="flex gap-2">
        {currentStage < formStages.length - 1 ? (
          <Button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Register Horse
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigationButtons;
