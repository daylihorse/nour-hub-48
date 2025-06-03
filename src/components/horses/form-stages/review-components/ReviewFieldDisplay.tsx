
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ReviewFieldDisplayProps {
  label: string;
  value: any;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const ReviewFieldDisplay = ({ label, value, variant = "secondary" }: ReviewFieldDisplayProps) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  
  const formatValue = (val: any) => {
    if (val instanceof Date) return format(val, "PPP");
    if (Array.isArray(val)) return val;
    if (typeof val === 'boolean') return val ? "Yes" : "No";
    return val;
  };

  const formattedValue = formatValue(value);

  if (Array.isArray(formattedValue)) {
    return (
      <div>
        <span className="text-muted-foreground">{label}:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {formattedValue.map((item, index) => (
            <Badge key={index} variant={variant} className="text-xs">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{formattedValue}</span>
    </div>
  );
};

export default ReviewFieldDisplay;
