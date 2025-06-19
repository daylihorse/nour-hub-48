
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, iconColor, label, value }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MetricCard;
