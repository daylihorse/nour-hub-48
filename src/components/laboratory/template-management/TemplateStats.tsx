
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Beaker, Globe, Users } from "lucide-react";

const TemplateStats = () => {
  const stats = [
    {
      title: "Total Templates",
      value: "24",
      description: "Active templates",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Result Templates",
      value: "18",
      description: "Lab test templates",
      icon: Beaker,
      color: "text-green-600"
    },
    {
      title: "Service Templates", 
      value: "6",
      description: "Service offerings",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Languages",
      value: "2",
      description: "English & Arabic",
      icon: Globe,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateStats;
