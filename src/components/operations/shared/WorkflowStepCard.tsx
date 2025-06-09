
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowStep } from "@/types/operations";
import { Clock, User, CheckCircle, Play, Pause } from "lucide-react";

interface WorkflowStepCardProps {
  step: WorkflowStep;
  index: number;
  canStart: boolean;
  onStart: (stepId: string) => void;
  onComplete: (stepId: string) => void;
}

const WorkflowStepCard = ({ 
  step, 
  index, 
  canStart, 
  onStart, 
  onComplete 
}: WorkflowStepCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in_progress':
        return 'bg-blue-50 border-blue-200';
      case 'blocked':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default' as const;
      case 'in_progress':
        return 'secondary' as const;
      case 'blocked':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <Card className={`${getStatusColor(step.status)} transition-colors`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2">
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
          <Badge variant={getStatusBadgeVariant(step.status)} className="capitalize">
            {step.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {step.department}
            </Badge>
          </div>
          {step.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{step.assignedTo}</span>
            </div>
          )}
          {step.estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{step.estimatedTime}</span>
            </div>
          )}
        </div>

        {step.actions && step.actions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium mb-1">Actions:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {step.actions.map((action, actionIndex) => (
                <li key={actionIndex} className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-current rounded-full" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          {step.status === 'pending' && canStart && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStart(step.id)}
              className="flex items-center gap-1"
            >
              <Play className="h-3 w-3" />
              Start
            </Button>
          )}
          {step.status === 'in_progress' && (
            <Button
              size="sm"
              onClick={() => onComplete(step.id)}
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Complete
            </Button>
          )}
          {step.status === 'completed' && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle className="h-3 w-3" />
              Completed
            </div>
          )}
          {step.status === 'blocked' && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <Pause className="h-3 w-3" />
              Blocked
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStepCard;
