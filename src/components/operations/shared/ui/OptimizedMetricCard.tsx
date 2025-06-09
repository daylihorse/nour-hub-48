
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface OptimizedMetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const OptimizedMetricCard = memo(({ 
  label, 
  value, 
  icon: Icon, 
  iconColor = "text-blue-500",
  className 
}: OptimizedMetricCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

OptimizedMetricCard.displayName = "OptimizedMetricCard";

export default OptimizedMetricCard;
