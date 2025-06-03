
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { FormStage } from "@/types/horse";

interface ValidationFeedbackProps {
  stage: FormStage;
  currentStage: number;
  completedStages: Set<number>;
}

const ValidationFeedback = ({ stage, currentStage, completedStages }: ValidationFeedbackProps) => {
  const isCompleted = completedStages.has(currentStage);
  const isRequired = stage.isRequired;

  if (isCompleted) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          This stage has been completed successfully.
        </AlertDescription>
      </Alert>
    );
  }

  if (isRequired) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          This stage is required. Please fill in all mandatory fields before proceeding.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        This stage is optional but recommended for complete horse registration.
      </AlertDescription>
    </Alert>
  );
};

export default ValidationFeedback;
