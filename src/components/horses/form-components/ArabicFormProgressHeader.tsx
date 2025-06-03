
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FormStage } from "@/types/horse";

interface ArabicFormProgressHeaderProps {
  currentStage: number;
  formStages: FormStage[];
  progress: number;
}

const ArabicFormProgressHeader = ({ currentStage, formStages, progress }: ArabicFormProgressHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-right">
            <CardTitle className="text-2xl">إضافة حصان جديد</CardTitle>
            <p className="text-muted-foreground">تسجيل حصان جديد في الإسطبل</p>
          </div>
          <Badge variant="outline" className="text-sm">
            المرحلة {currentStage + 1} من {formStages.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-right">{Math.round(progress)}% مكتمل</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ArabicFormProgressHeader;
