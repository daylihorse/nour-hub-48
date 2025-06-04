
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { getStatusColor, getStatusLabel } from "../utils/statusUtils";
import { TestValueStatus } from "../../AddTestResultDialog";

interface StatusIndicatorProps {
  status: TestValueStatus | string;
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const getStatusIcon = (status: TestValueStatus | string) => {
    switch (status) {
      case 'critical-high':
      case 'critical-low':
        return <XCircle className="h-3 w-3" />;
      case 'very-high':
      case 'very-low':
        return <AlertTriangle className="h-3 w-3" />;
      case 'high':
      case 'low':
        return <AlertCircle className="h-3 w-3" />;
      case 'slightly-high':
      case 'slightly-low':
        return <AlertCircle className="h-3 w-3" />;
      case 'normal':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span>{getStatusLabel(status)}</span>
    </div>
  );
};
