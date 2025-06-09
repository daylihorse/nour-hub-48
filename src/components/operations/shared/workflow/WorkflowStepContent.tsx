
import { Checkbox } from "@/components/ui/checkbox";
import { WorkflowStep } from "@/types/operations";

interface WorkflowStepContentProps {
  step: WorkflowStep;
}

const WorkflowStepContent = ({ step }: WorkflowStepContentProps) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">
        {step.description}
      </p>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        {step.assignedTo && (
          <span>Assigned to: {step.assignedTo}</span>
        )}
        {step.estimatedTime && (
          <span>Est. time: {step.estimatedTime}</span>
        )}
      </div>
      
      <div className="space-y-1">
        {step.actions.map((action, actionIndex) => (
          <div key={actionIndex} className="flex items-center gap-2">
            <Checkbox 
              id={`${step.id}-action-${actionIndex}`}
              checked={step.status === 'completed'}
              disabled={step.status !== 'in_progress'}
            />
            <label 
              htmlFor={`${step.id}-action-${actionIndex}`}
              className="text-sm"
            >
              {action}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowStepContent;
