
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormStage } from "@/types/horse";

interface TopNavigationButtonsProps {
  currentStage: number;
  formStages: FormStage[];
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const TopNavigationButtons = ({
  currentStage,
  formStages,
  onPrevious,
  onNext,
  onSubmit
}: TopNavigationButtonsProps) => {
  const isFirstStage = currentStage === 0;
  const isLastStage = currentStage === formStages.length - 1;

  return (
    <div className="flex justify-between items-center py-4 border-b bg-background">
      <div>
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

export default TopNavigationButtons;
