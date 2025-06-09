
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Warehouse, 
  Package, 
  FlaskRound, 
  Hospital,
  FileText
} from "lucide-react";
import { WorkflowStep } from "@/types/operations";
import { getPriorityColor } from "@/utils/operationsUtils";

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

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Stable Rooms': return <Warehouse className="h-4 w-4" />;
      case 'Inventory': return <Package className="h-4 w-4" />;
      case 'Laboratory': return <FlaskRound className="h-4 w-4" />;
      case 'Clinic': return <Hospital className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
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
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium">{step.title}</h4>
              <div className="flex items-center gap-1">
                {getDepartmentIcon(step.department)}
                <Badge variant="outline" className="text-xs">
                  {step.department}
                </Badge>
              </div>
            </div>
            
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
        </div>
        
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
      </div>
    </div>
  );
};

export default WorkflowStepCard;
