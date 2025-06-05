
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Check, Clock, Circle, AlertCircle } from "lucide-react";
import { formStages } from "../config/formStages";
import { cn } from "@/lib/utils";

interface MobileFormHeaderProps {
  currentStage: number;
  completedStages: Set<number>;
  visitedStages: Set<number>;
  progress: number;
  onStageClick: (stageIndex: number) => void;
  onCancel: () => void;
}

const MobileFormHeader = ({ 
  currentStage, 
  completedStages,
  visitedStages,
  progress, 
  onStageClick, 
  onCancel 
}: MobileFormHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentStageData = formStages[currentStage];

  const getStageIcon = (stageIndex: number) => {
    if (completedStages.has(stageIndex)) {
      return <Check className="h-4 w-4 text-white" />;
    }
    if (stageIndex === currentStage) {
      return <Clock className="h-4 w-4 text-white" />;
    }
    if (visitedStages.has(stageIndex)) {
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    }
    return <Circle className="h-4 w-4 text-gray-400" />;
  };

  const getStageStatus = (stageIndex: number) => {
    if (completedStages.has(stageIndex)) return "completed";
    if (stageIndex === currentStage) return "current";
    if (visitedStages.has(stageIndex)) return "visited";
    return "unvisited";
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="h-full flex flex-col">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-semibold text-gray-900">Navigation</h1>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>

                {/* Mobile Menu Steps */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Tip:</strong> Tap any step to navigate and preview required information.
                    </p>
                  </div>
                  
                  <nav className="space-y-2">
                    {formStages.map((stage, index) => {
                      const status = getStageStatus(index);
                      
                      return (
                        <button
                          key={stage.id}
                          onClick={() => {
                            onStageClick(index);
                            setIsMenuOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200",
                            status === "current" && "bg-blue-50 border border-blue-200",
                            status === "completed" && "bg-green-50 border border-green-200",
                            status === "visited" && "bg-orange-50 border border-orange-200"
                          )}
                        >
                          <div className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
                            status === "completed" && "bg-green-500",
                            status === "current" && "bg-blue-500",
                            status === "visited" && "bg-orange-100 border border-orange-300",
                            status === "unvisited" && "bg-gray-200"
                          )}>
                            {getStageIcon(index)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-500">
                                Step {index + 1}
                              </span>
                              {stage.isRequired && (
                                <span className="text-xs text-red-500">*</span>
                              )}
                              {status === "completed" && (
                                <span className="text-xs text-green-600 font-medium">Complete</span>
                              )}
                              {status === "visited" && !completedStages.has(index) && (
                                <span className="text-xs text-orange-600 font-medium">Review</span>
                              )}
                            </div>
                            <h3 className="font-medium text-sm">{stage.title}</h3>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-500">
                Step {currentStage + 1} of {formStages.length}
              </span>
              {currentStageData?.isRequired && (
                <span className="text-xs text-red-500">*</span>
              )}
              {completedStages.has(currentStage) && (
                <span className="text-xs text-green-600 font-medium">Complete</span>
              )}
              {visitedStages.has(currentStage) && !completedStages.has(currentStage) && (
                <span className="text-xs text-orange-600 font-medium">Review</span>
              )}
            </div>
            <h2 className="font-semibold text-gray-900 text-sm leading-tight">
              {currentStageData?.title}
            </h2>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Progress Bar */}
      <Progress value={progress} className="h-1.5" />
    </div>
  );
};

export default MobileFormHeader;
