
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, ChevronDown, CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formStages } from "../config/consolidatedFormStages";

interface MobileFormHeaderProps {
  currentStage: number;
  completedStages: Set<number>;
  visitedStages: Set<number>;
  progress: number;
  onStageClick: (stage: number) => void;
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
  const currentStageData = formStages[currentStage];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-gray-900">Horse Registration</h1>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Stage */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{currentStageData.title}</span>
              {currentStageData.isRequired && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[300px]">
          {formStages.map((stage, index) => {
            const isCompleted = completedStages.has(index);
            const isCurrent = currentStage === index;
            const isVisited = visitedStages.has(index);
            
            return (
              <DropdownMenuItem
                key={stage.id}
                onClick={() => onStageClick(index)}
                className={`flex items-center gap-3 p-3 ${
                  isCurrent ? "bg-blue-50" : ""
                }`}
                disabled={!isVisited && !isCurrent}
              >
                <div className="flex-shrink-0">
                  {isCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      isCurrent ? "text-blue-900" : "text-gray-900"
                    }`}>
                      {stage.title}
                    </span>
                    {stage.isRequired && (
                      <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                        Required
                      </Badge>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileFormHeader;
