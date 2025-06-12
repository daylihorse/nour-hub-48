
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, TrendingUp, Clock } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const MetricCard = ({ title, value, change, trend, icon: Icon, color }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-muted-foreground'}`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

const ClinicMetrics = () => {
  const keyMetrics = [
    {
      title: "Today's Appointments",
      value: "24",
      change: "+3 from yesterday",
      trend: "up" as const,
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Active Patients",
      value: "156",
      change: "+12 this week",
      trend: "up" as const,
      icon: Heart,
      color: "text-red-600"
    },
    {
      title: "Recovery Rate",
      value: "96.8%",
      change: "+1.1% this month",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Avg Wait Time",
      value: "12 min",
      change: "-3 min improved",
      trend: "up" as const,
      icon: Clock,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {keyMetrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
};

export default ClinicMetrics;
