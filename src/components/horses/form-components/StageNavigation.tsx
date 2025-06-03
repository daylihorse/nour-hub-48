
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { FormStage } from "@/types/horse";

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
              disabled={index > Math.max(...Array.from(completedStages)) + 1}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all
                ${index === currentStage 
                  ? 'bg-primary text-primary-foreground' 
                  : completedStages.has(index)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : index <= Math.max(...Array.from(completedStages)) + 1
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {completedStages.has(index) ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">{stage.title}</span>
              <span className="sm:hidden">{index + 1}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StageNavigation;
