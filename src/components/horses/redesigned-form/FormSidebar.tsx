
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, Clock, Circle, X } from "lucide-react";
import { formStages } from "../config/formStages";
import { cn } from "@/lib/utils";

interface FormSidebarProps {
  currentStage: number;
  completedStages: Set<number>;
  progress: number;
  onStageClick: (stageIndex: number) => void;
  onCancel: () => void;
}

const FormSidebar = ({ 
  currentStage, 
  completedStages, 
  progress, 
  onStageClick, 
  onCancel 
}: FormSidebarProps) => {
  const getStageIcon = (stageIndex: number) => {
    if (completedStages.has(stageIndex)) {
      return <Check className="h-5 w-5 text-white" />;
    }
    if (stageIndex === currentStage) {
      return <Clock className="h-5 w-5 text-white" />;
    }
    return <Circle className="h-5 w-5 text-gray-400" />;
  };

  const getStageStatus = (stageIndex: number) => {
    if (completedStages.has(stageIndex)) return "completed";
    if (stageIndex === currentStage) return "current";
    if (stageIndex < currentStage) return "available";
    return "upcoming";
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Horse Registration</h1>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="space-y-2">
          {formStages.map((stage, index) => {
            const status = getStageStatus(index);
            const isClickable = status === "completed" || status === "current" || status === "available";
            
            return (
              <button
                key={stage.id}
                onClick={() => isClickable && onStageClick(index)}
                disabled={!isClickable}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200",
                  status === "current" && "bg-blue-50 border border-blue-200",
                  status === "completed" && "bg-green-50 border border-green-200 hover:bg-green-100",
                  status === "available" && "hover:bg-gray-50",
                  status === "upcoming" && "opacity-50 cursor-not-allowed"
                )}
              >
                {/* Step Icon */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5",
                  status === "completed" && "bg-green-500",
                  status === "current" && "bg-blue-500",
                  status === "available" && "bg-gray-300",
                  status === "upcoming" && "bg-gray-200"
                )}>
                  {getStageIcon(index)}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      Step {index + 1}
                    </span>
                    {stage.isRequired && (
                      <span className="text-xs text-red-500">*</span>
                    )}
                  </div>
                  <h3 className={cn(
                    "font-medium text-sm leading-tight",
                    status === "current" && "text-blue-900",
                    status === "completed" && "text-green-900",
                    status === "available" && "text-gray-900",
                    status === "upcoming" && "text-gray-500"
                  )}>
                    {stage.title}
                  </h3>
                  <p className={cn(
                    "text-xs mt-1 leading-tight",
                    status === "current" && "text-blue-700",
                    status === "completed" && "text-green-700",
                    status === "available" && "text-gray-600",
                    status === "upcoming" && "text-gray-400"
                  )}>
                    {stage.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          All fields marked with * are required
        </p>
      </div>
    </div>
  );
};

export default FormSidebar;
