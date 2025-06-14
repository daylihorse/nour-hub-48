
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const isFirstStage = currentStage === 0;
  const isLastStage = currentStage === formStages.length - 1;

  return (
    <div className="flex justify-between items-center pt-6">
      <div className="flex gap-2">
        {!isFirstStage && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
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

      <div>
        {isLastStage ? (
          <Button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-2"
          >
            Submit Registration
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigationButtons;
