
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, FileText, Activity } from "lucide-react";

const ClinicStats = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Patients",
      value: "89",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Pending Results",
      value: "5",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Emergency Cases",
      value: "2",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ClinicStats;
