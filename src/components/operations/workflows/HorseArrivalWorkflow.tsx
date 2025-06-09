
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { useWorkflowManagement } from "@/hooks/useWorkflowManagement";
import WorkflowStepCard from "../shared/WorkflowStepCard";

const HorseArrivalWorkflow = () => {
  const {
    workflowSteps,
    progressPercentage,
    completedSteps,
    canStartStep,
    startStep,
    completeStep
  } = useWorkflowManagement();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Horse Arrival Workflow</span>
            <Badge variant="outline">
              {completedSteps}/{workflowSteps.length} Steps Complete
            </Badge>
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id}>
                <WorkflowStepCard
                  step={step}
                  index={index}
                  canStart={canStartStep(step)}
                  onStart={startStep}
                  onComplete={completeStep}
                />
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorseArrivalWorkflow;
