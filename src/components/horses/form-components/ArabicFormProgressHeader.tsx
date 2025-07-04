
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { FormStage } from "@/types/horse";

interface ArabicFormProgressHeaderProps {
  currentStage: number;
  formStages: FormStage[];
  progress: number;
  validationStatus?: "complete" | "errors" | "in_progress";
}

const ArabicFormProgressHeader = ({ 
  currentStage, 
  formStages, 
  progress,
  validationStatus = "in_progress"
}: ArabicFormProgressHeaderProps) => {
  
  const getStatusIcon = () => {
    switch (validationStatus) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "errors":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusText = () => {
    switch (validationStatus) {
      case "complete":
        return "مكتمل";
      case "errors":
        return "يحتاج إصلاح";
      default:
        return "قيد التقدم";
    }
  };

  const getStatusColor = () => {
    switch (validationStatus) {
      case "complete":
        return "bg-green-100 text-green-800 border-green-200";
      case "errors":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-right">
            <CardTitle className="text-2xl">إضافة حصان جديد</CardTitle>
            <p className="text-muted-foreground">تسجيل حصان جديد في الإسطبل</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={`text-sm flex items-center gap-2 ${getStatusColor()}`}
            >
              {getStatusIcon()}
              {getStatusText()}
            </Badge>
            <Badge variant="outline" className="text-sm">
              المرحلة {currentStage + 1} من {formStages.length}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{Math.round(progress)}% مكتمل</span>
            <span className="text-right">
              {validationStatus === "complete" 
                ? "جاهز للتسجيل" 
                : validationStatus === "errors"
                ? "يرجى مراجعة الأخطاء"
                : "استمر في ملء النموذج"
              }
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ArabicFormProgressHeader;
