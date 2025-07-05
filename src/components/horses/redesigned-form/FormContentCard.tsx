
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorseFormData, FormStage } from "@/types/horse-unified";
import StageContentRenderer from "../form-components/StageContentRenderer";
import ValidationFeedback from "../form-components/ValidationFeedback";

interface FormContentCardProps {
  stage: FormStage;
  onSubmit?: () => void;
  errors?: string[];
}

const FormContentCard = ({ stage, onSubmit, errors }: FormContentCardProps) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{stage.title}</span>
          {stage.isRequired && (
            <span className="text-sm text-red-500">*Required</span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{stage.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <StageContentRenderer stage={stage} onSubmit={onSubmit} />
          <ValidationFeedback stage={stage} errors={errors} />
        </div>
      </CardContent>
    </Card>
  );
};

export default FormContentCard;
