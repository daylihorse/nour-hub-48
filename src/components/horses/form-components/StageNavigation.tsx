
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { FormStage } from "@/types/horse-unified";

interface StageNavigationProps {
  formStages: FormStage[];
  currentStage: number;
  completedStages: Set<number>;
  onStageClick: (stageIndex: number) => void;
}

const StageNavigation = ({ 
  formStages, 
  currentStage, 
  completedStages, 
  onStageClick 
}: StageNavigationProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2">
          {formStages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => onStageClick(index)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all hover:scale-105
                ${index === currentStage 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : completedStages.has(index)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              {completedStages.has(index) ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                Step {index + 1}: {stage.title}
              </span>
              <span className="sm:hidden">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StageNavigation;
