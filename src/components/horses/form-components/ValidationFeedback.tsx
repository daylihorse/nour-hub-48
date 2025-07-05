
import { FormStage } from "@/types/horse-unified";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ValidationFeedbackProps {
  stage: FormStage;
  errors?: string[];
  currentStage?: number;
  completedStages?: Set<number>;
}

const ValidationFeedback = ({ stage, errors, currentStage, completedStages }: ValidationFeedbackProps) => {
  if (!errors || errors.length === 0) {
    if (stage.isComplete) {
      return (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="h-4 w-4" />
          <span>Stage completed successfully</span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

export default ValidationFeedback;
