
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

const StatusBadge = ({ status, variant = "outline", className }: StatusBadgeProps) => {
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };

  return (
    <Badge variant={variant} className={className}>
      {formatStatus(status)}
    </Badge>
  );
};

export default StatusBadge;
