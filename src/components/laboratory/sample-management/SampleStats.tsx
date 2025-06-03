
import { Card, CardContent } from "@/components/ui/card";
import { TestTube2, Calendar, User } from "lucide-react";

const SampleStats = () => {
  const stats = [
    {
      title: "Total Samples",
      value: "247",
      icon: TestTube2,
      color: "text-blue-500"
    },
    {
      title: "Today's Collection",
      value: "12",
      icon: Calendar,
      color: "text-green-500"
    },
    {
      title: "Processing",
      value: "8",
      icon: User,
      color: "text-orange-500"
    },
    {
      title: "Urgent",
      value: "3",
      icon: TestTube2,
      color: "text-red-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SampleStats;
