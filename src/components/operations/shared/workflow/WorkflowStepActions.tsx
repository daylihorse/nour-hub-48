
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowStep } from "@/types/operations";

interface WorkflowStepActionsProps {
  step: WorkflowStep;
  canStart: boolean;
  onStart: (stepId: string) => void;
  onComplete: (stepId: string) => void;
}

const WorkflowStepActions = ({ step, canStart, onStart, onComplete }: WorkflowStepActionsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {step.status === 'in_progress' && (
        <Button 
          size="sm" 
          onClick={() => onComplete(step.id)}
        >
          Complete
        </Button>
      )}
      {canStart && (
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onStart(step.id)}
        >
          Start
        </Button>
      )}
      {step.dependencies && step.status === 'pending' && !canStart && (
        <Badge variant="secondary" className="text-xs">
          Waiting for dependencies
        </Badge>
      )}
    </div>
  );
};

export default WorkflowStepActions;
