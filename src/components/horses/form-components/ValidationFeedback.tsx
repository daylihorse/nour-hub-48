
import { useFormContext } from "react-hook-form";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FormStage } from "@/types/horse";

interface ValidationFeedbackProps {
  stage: FormStage;
  currentStage: number;
  completedStages: Set<number>;
}

const ValidationFeedback = ({ stage, currentStage, completedStages }: ValidationFeedbackProps) => {
  const form = useFormContext();
  const errors = form.formState.errors;
  const isCompleted = completedStages.has(currentStage);

  // Get errors specific to this stage
  const stageErrors = stage.fields.filter(field => errors[field]).map(field => ({
    field,
    message: errors[field]?.message as string
  }));

  if (isCompleted && stageErrors.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          This stage is complete and validated.
        </AlertDescription>
      </Alert>
    );
  }

  if (stageErrors.length > 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p>Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1">
              {stageErrors.map(({ field, message }) => (
                <li key={field} className="text-sm">
                  <span className="font-medium">{field}:</span> {message}
                </li>
              ))}
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={stage.isRequired ? "default" : "secondary"}>
        {stage.isRequired ? "Required" : "Optional"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        {stage.isRequired ? "This stage must be completed" : "This stage is optional"}
      </span>
    </div>
  );
};

export default ValidationFeedback;
