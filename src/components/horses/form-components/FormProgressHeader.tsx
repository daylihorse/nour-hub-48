
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FormStage } from "@/types/horse-unified";

interface FormProgressHeaderProps {
  currentStage: number;
  formStages: FormStage[];
  progress: number;
}

const FormProgressHeader = ({ currentStage, formStages, progress }: FormProgressHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Add New Horse</CardTitle>
            <p className="text-muted-foreground">Register a new horse in the stable</p>
          </div>
          <Badge variant="outline" className="text-sm">
            Stage {currentStage + 1} of {formStages.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default FormProgressHeader;
