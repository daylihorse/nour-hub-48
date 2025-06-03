
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormStage } from "@/types/horse";

interface ArabicFormNavigationButtonsProps {
  currentStage: number;
  formStages: FormStage[];
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const ArabicFormNavigationButtons = ({
  currentStage,
  formStages,
  onPrevious,
  onNext,
  onCancel,
  onSubmit
}: ArabicFormNavigationButtonsProps) => {
  return (
    <div className="flex gap-2">
      {currentStage < formStages.length - 1 ? (
        <Button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2"
        >
          التالي
          <ArrowLeft className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          تسجيل الحصان
        </Button>
      )}
      
      {currentStage > 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          السابق
        </Button>
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        إلغاء
      </Button>
    </div>
  );
};

export default ArabicFormNavigationButtons;
