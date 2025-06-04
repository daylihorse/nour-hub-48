
import { UseFormReturn } from "react-hook-form";
import { HorseFormData } from "@/types/horse";
import { formStages } from "../config/formStages";
import FormContentCard from "./FormContentCard";
import FormNavigationFooter from "./FormNavigationFooter";

interface FormMainContentProps {
  form: UseFormReturn<HorseFormData>;
  currentStage: number;
  completedStages: Set<number>;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const FormMainContent = ({
  form,
  currentStage,
  completedStages,
  onNext,
  onPrevious,
  onCancel,
  onSubmit
}: FormMainContentProps) => {
  const currentStageData = formStages[currentStage];

  if (!currentStageData) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading...</h3>
          <p className="text-gray-600">Please wait while we load the form stage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          <FormContentCard
            form={form}
            currentStage={currentStage}
            completedStages={completedStages}
            stageData={currentStageData}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      {/* Fixed Navigation Footer */}
      <FormNavigationFooter
        currentStage={currentStage}
        totalStages={formStages.length}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default FormMainContent;
