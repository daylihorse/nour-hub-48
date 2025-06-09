
import { Badge } from "@/components/ui/badge";
import { 
  Warehouse, 
  Package, 
  FlaskRound, 
  Hospital,
  FileText
} from "lucide-react";
import { WorkflowStep } from "@/types/operations";

interface WorkflowStepHeaderProps {
  step: WorkflowStep;
}

const WorkflowStepHeader = ({ step }: WorkflowStepHeaderProps) => {
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
    <div className="flex items-center gap-2 mb-2">
      <h4 className="font-medium">{step.title}</h4>
      <div className="flex items-center gap-1">
        {getDepartmentIcon(step.department)}
        <Badge variant="outline" className="text-xs">
          {step.department}
        </Badge>
      </div>
    </div>
  );
};

export default WorkflowStepHeader;
