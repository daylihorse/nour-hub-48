
import { AlertTriangle, CheckCircle } from "lucide-react";
import { getStatusColor } from "../utils/statusUtils";

interface StatusIndicatorProps {
  status: string;
}

export const StatusIndicator = ({ status }: StatusIndicatorProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
      case 'low':
        return <AlertTriangle className="h-3 w-3" />;
      case 'normal':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span className="capitalize">{status}</span>
    </div>
  );
};
