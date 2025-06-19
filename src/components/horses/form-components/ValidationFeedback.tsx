
import { FormStage } from "@/types/horse-unified";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface ValidationFeedbackProps {
  stage: FormStage;
  currentStage: number;
  completedStages: Set<number>;
}

const ValidationFeedback = ({ stage, currentStage, completedStages }: ValidationFeedbackProps) => {
  const isCompleted = completedStages.has(currentStage);
  
  if (isCompleted) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">Stage Completed</p>
          <p className="text-sm text-green-600">All required fields have been filled.</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Complete
        </Badge>
      </div>
    );
  }

  if (stage.isRequired) {
    return (
      <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800">Required Stage</p>
          <p className="text-sm text-amber-600">Please complete all required fields to continue.</p>
        </div>
        <Badge variant="destructive" className="bg-amber-100 text-amber-800">
          Required
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <Clock className="h-5 w-5 text-blue-600" />
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-800">Optional Stage</p>
        <p className="text-sm text-blue-600">This information can be added now or later.</p>
      </div>
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        Optional
      </Badge>
    </div>
  );
};

export default ValidationFeedback;
