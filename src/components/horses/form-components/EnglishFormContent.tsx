
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { formStages } from "../config/formStages";
import ValidationFeedback from "./ValidationFeedback";
import StageContentRenderer from "./StageContentRenderer";
import TopNavigationButtons from "./TopNavigationButtons";

interface EnglishFormContentProps {
  form: UseFormReturn<HorseFormData>;
  currentStage: number;
  completedStages: Set<number>;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const EnglishFormContent = ({
  form,
  currentStage,
  completedStages,
  onNext,
  onPrevious,
  onCancel,
  onSubmit
}: EnglishFormContentProps) => {
  const currentStageData = formStages[currentStage];

  if (!currentStageData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading stage information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <TopNavigationButtons
        currentStage={currentStage}
        formStages={formStages}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
      
      <CardHeader>
        <div>
          <CardTitle>Step {currentStage + 1}: {currentStageData.title}</CardTitle>
          <p className="text-muted-foreground">{currentStageData.description}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ValidationFeedback
          stage={currentStageData}
          currentStage={currentStage}
          completedStages={completedStages}
        />
        <StageContentRenderer 
          stage={currentStageData} 
          onSubmit={onSubmit}
        />
        
        <div className="flex justify-end pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnglishFormContent;
