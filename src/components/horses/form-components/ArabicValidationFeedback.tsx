
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { FormStage } from "@/types/horse";

interface ArabicValidationFeedbackProps {
  stage: FormStage;
  currentStage: number;
  completedStages: Set<number>;
}

const ArabicValidationFeedback = ({ 
  stage, 
  currentStage, 
  completedStages 
}: ArabicValidationFeedbackProps) => {
  const form = useFormContext();
  const formState = form.formState;
  const errors = formState.errors;

  // Get stage-specific errors
  const stageErrors = stage.fields.filter(field => errors[field]);
  const hasStageErrors = stageErrors.length > 0;
  const isStageComplete = completedStages.has(currentStage);

  // Get validation status
  const getValidationStatus = () => {
    if (isStageComplete && !hasStageErrors) return "success";
    if (hasStageErrors) return "error";
    return "pending";
  };

  const status = getValidationStatus();

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "success":
        return "تم إكمال هذه المرحلة بنجاح";
      case "error":
        return `يوجد ${stageErrors.length} خطأ يجب إصلاحها`;
      default:
        return "يرجى ملء الحقول المطلوبة";
    }
  };

  const getAlertVariant = () => {
    switch (status) {
      case "success":
        return "default";
      case "error":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-3" dir="rtl">
      <Alert variant={getAlertVariant()} className="text-right">
        <div className="flex items-center gap-2 justify-end">
          <AlertDescription>{getStatusMessage()}</AlertDescription>
          {getStatusIcon()}
        </div>
      </Alert>

      {hasStageErrors && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-red-600 text-right">الأخطاء المطلوب إصلاحها:</h4>
          <ul className="text-sm text-red-600 space-y-1">
            {stageErrors.map((field) => {
              const error = errors[field];
              return (
                <li key={field} className="text-right">
                  • {error?.message as string}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArabicValidationFeedback;
