
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
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

  console.log("FormNavigationButtons - Current stage:", currentStage, "Is last stage:", isLastStage);

  const handleSubmitClick = () => {
    console.log("Submit button clicked in FormNavigationButtons");
    onSubmit();
  };

  return (
    <div className="flex items-center justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStage}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        {isLastStage ? (
          <Button
            type="button"
            onClick={handleSubmitClick}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4" />
            Register Horse
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
