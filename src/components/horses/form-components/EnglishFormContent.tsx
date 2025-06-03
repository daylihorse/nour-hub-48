
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData } from "@/types/horse";
import { formStages } from "../config/formStages";
import FormNavigationButtons from "./FormNavigationButtons";
import ValidationFeedback from "./ValidationFeedback";
import StageContentRenderer from "./StageContentRenderer";

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
      <CardHeader>
        <div>
          <CardTitle>{currentStageData.title}</CardTitle>
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
        <FormNavigationButtons
          currentStage={currentStage}
          formStages={formStages}
          onPrevious={onPrevious}
          onNext={onNext}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default EnglishFormContent;
