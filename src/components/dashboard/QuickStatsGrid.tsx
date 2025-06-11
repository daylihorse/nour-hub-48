
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  AlertTriangle, 
  Rabbit, 
  Warehouse,
  Users,
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react";

const QuickStatsGrid = () => {
  const stats = [
    {
      label: "Active Horses",
      value: "47",
      icon: Rabbit,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      trend: "+3 this month",
      trendUp: true
    },
    {
      label: "Occupied Rooms",
      value: "32/45",
      icon: Warehouse,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      trend: "71% occupancy",
      trendUp: true
    },
    {
      label: "Staff Members",
      value: "24",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
      trend: "All active",
      trendUp: true
    },
    {
      label: "Pending Tasks",
      value: "8",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      trend: "Due today",
      trendUp: false
    },
    {
      label: "This Month",
      value: "156",
      icon: Calendar,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      trend: "Appointments",
      trendUp: true
    },
    {
      label: "Completed",
      value: "92%",
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      trend: "Success rate",
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-brown transition-shadow duration-200 border-0 shadow-brown">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              {!stat.trendUp && stat.label === "Pending Tasks" && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Alert
                </Badge>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-brown-900 mb-1">{stat.value}</p>
              <p className="text-xs text-brown-600 font-medium mb-1">{stat.label}</p>
              <div className="flex items-center">
                {stat.trendUp && (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                )}
                <p className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-orange-600'}`}>
                  {stat.trend}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
