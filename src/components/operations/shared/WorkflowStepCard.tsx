
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle
} from "lucide-react";
import { WorkflowStep } from "@/types/operations";
import WorkflowStepActions from "./workflow/WorkflowStepActions";
import WorkflowStepHeader from "./workflow/WorkflowStepHeader";
import WorkflowStepContent from "./workflow/WorkflowStepContent";

interface WorkflowStepCardProps {
  step: WorkflowStep;
  index: number;
  canStart: boolean;
  onStart: (stepId: string) => void;
  onComplete: (stepId: string) => void;
}

const WorkflowStepCard = ({ step, index, canStart, onStart, onComplete }: WorkflowStepCardProps) => {
  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-50 border-green-200';
      case 'in_progress': return 'bg-blue-50 border-blue-200';
      case 'blocked': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor(step.status)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex items-center gap-2 mt-1">
            {getStatusIcon(step.status)}
            <span className="text-sm font-medium">{index + 1}</span>
          </div>
          
          <div className="flex-1">
            <WorkflowStepHeader step={step} />
            <WorkflowStepContent step={step} />
          </div>
        </div>
        
        <WorkflowStepActions
          step={step}
          canStart={canStart}
          onStart={onStart}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default WorkflowStepCard;
