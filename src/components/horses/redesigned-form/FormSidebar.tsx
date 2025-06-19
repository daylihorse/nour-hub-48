
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle, Circle } from "lucide-react";
import { formStages } from "../config/consolidatedFormStages";

interface FormSidebarProps {
  currentStage: number;
  completedStages: Set<number>;
  visitedStages: Set<number>;
  progress: number;
  onStageClick: (stage: number) => void;
  onCancel: () => void;
}

const FormSidebar = ({
  currentStage,
  completedStages,
  visitedStages,
  progress,
  onStageClick,
  onCancel
}: FormSidebarProps) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Horse Registration</h2>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Stage List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {formStages.map((stage, index) => {
            const isCompleted = completedStages.has(index);
            const isCurrent = currentStage === index;
            const isVisited = visitedStages.has(index);
            
            return (
              <button
                key={stage.id}
                onClick={() => onStageClick(index)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isCurrent
                    ? "bg-white border-blue-200 shadow-sm"
                    : isVisited
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-gray-100 border-gray-200 opacity-75"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className={`h-5 w-5 ${isCurrent ? "text-blue-600" : "text-gray-400"}`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-medium truncate ${
                        isCurrent ? "text-blue-900" : "text-gray-900"
                      }`}>
                        {stage.title}
                      </h3>
                      {stage.isRequired && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Step {currentStage + 1} of {formStages.length}
        </div>
      </div>
    </div>
  );
};

export default FormSidebar;
