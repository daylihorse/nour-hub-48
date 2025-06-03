
import { useFormContext } from "react-hook-form";
import { FormStage } from "@/types/horse";
import { stageValidationSchemas } from "@/components/horses/form-schema/EnhancedHorseFormSchema";

export const useStageValidation = () => {
  const form = useFormContext();

  const validateStage = async (stage: FormStage): Promise<boolean> => {
    const stageSchema = stageValidationSchemas[stage.id as keyof typeof stageValidationSchemas];
    
    if (!stageSchema) {
      console.warn(`No validation schema found for stage: ${stage.id}`);
      return true;
    }

    try {
      const formData = form.getValues();
      await stageSchema.parseAsync(formData);
      return true;
    } catch (error) {
      // Trigger validation to show errors
      await form.trigger(stage.fields as any);
      return false;
    }
  };

  const getStageProgress = (stages: FormStage[], completedStages: Set<number>): number => {
    const totalStages = stages.length;
    const completed = completedStages.size;
    return Math.round((completed / totalStages) * 100);
  };

  const getOverallValidationStatus = (stages: FormStage[], completedStages: Set<number>) => {
    const errors = form.formState.errors;
    const hasErrors = Object.keys(errors).length > 0;
    const allStagesCompleted = completedStages.size === stages.length;

    if (allStagesCompleted && !hasErrors) return "complete";
    if (hasErrors) return "errors";
    return "in_progress";
  };

  return {
    validateStage,
    getStageProgress,
    getOverallValidationStatus,
    formErrors: form.formState.errors,
    isValid: form.formState.isValid,
  };
};
