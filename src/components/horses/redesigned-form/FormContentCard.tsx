
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HorseFormData, FormStage } from "@/types/horse-unified";
import StageContentRenderer from "../form-components/StageContentRenderer";
import ValidationFeedback from "../form-components/ValidationFeedback";

interface FormContentCardProps {
  form: UseFormReturn<HorseFormData>;
  currentStage: number;
  completedStages: Set<number>;
  stageData: FormStage;
  onSubmit: () => void;
}

const FormContentCard = ({
  form,
  currentStage,
  completedStages,
  stageData,
  onSubmit
}: FormContentCardProps) => {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="border-b border-gray-100 pb-6">
        <div className="space-y-4">
          {/* Stage Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {stageData.title}
                </h1>
                {stageData.isRequired && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {stageData.description}
              </p>
            </div>
          </div>

          {/* Validation Feedback */}
          <ValidationFeedback
            stage={stageData}
            currentStage={currentStage}
            completedStages={completedStages}
          />
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="max-w-3xl">
          <StageContentRenderer 
            stage={stageData} 
            onSubmit={onSubmit}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FormContentCard;
