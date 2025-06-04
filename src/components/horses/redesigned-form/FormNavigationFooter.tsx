
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

interface FormNavigationFooterProps {
  currentStage: number;
  totalStages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const FormNavigationFooter = ({
  currentStage,
  totalStages,
  onPrevious,
  onNext,
  onSubmit,
  onCancel
}: FormNavigationFooterProps) => {
  const isFirstStage = currentStage === 0;
  const isLastStage = currentStage === totalStages - 1;

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Previous Button */}
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

        {/* Stage Counter */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <span>Step</span>
          <span className="font-medium text-gray-900">
            {currentStage + 1}
          </span>
          <span>of</span>
          <span className="font-medium text-gray-900">
            {totalStages}
          </span>
        </div>

        {/* Next/Submit Button */}
        {isLastStage ? (
          <Button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4" />
            Complete Registration
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

export default FormNavigationFooter;
