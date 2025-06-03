
import { Card, CardContent } from "@/components/ui/card";
import { FormStage } from "@/types/horse";

interface ArabicStageNavigationProps {
  formStages: FormStage[];
  currentStage: number;
  completedStages: Set<number>;
  onStageClick: (stageIndex: number) => void;
}

const ArabicStageNavigation = ({ 
  formStages, 
  currentStage, 
  completedStages, 
  onStageClick 
}: ArabicStageNavigationProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 justify-end">
          {formStages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => onStageClick(index)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all
                ${index === currentStage 
                  ? 'bg-primary text-primary-foreground' 
                  : completedStages.has(index)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              <span>{stage.title}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArabicStageNavigation;
