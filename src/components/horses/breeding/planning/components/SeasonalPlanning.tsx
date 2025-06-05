
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sun, Snowflake, Flower, Leaf } from "lucide-react";

const SeasonalPlanning = () => {
  const seasons = [
    {
      name: "Spring",
      icon: <Flower className="h-5 w-5 text-green-500" />,
      months: "Mar - May",
      activities: [
        { name: "Peak Breeding Season", status: "optimal", priority: "high" },
        { name: "Foaling Season", status: "active", priority: "high" },
        { name: "Pasture Breeding", status: "optimal", priority: "medium" }
      ],
      recommendations: [
        "Optimal time for natural breeding",
        "Monitor mare heat cycles closely",
        "Prepare foaling facilities"
      ],
      utilization: 85
    },
    {
      name: "Summer", 
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      months: "Jun - Aug",
      activities: [
        { name: "Late Breeding", status: "good", priority: "medium" },
        { name: "Pregnancy Monitoring", status: "active", priority: "high" },
        { name: "Heat Management", status: "critical", priority: "high" }
      ],
      recommendations: [
        "Focus on pregnancy care",
        "Implement heat stress protocols",
        "Adjust breeding schedules for heat"
      ],
      utilization: 60
    },
    {
      name: "Fall",
      icon: <Leaf className="h-5 w-5 text-orange-500" />,
      months: "Sep - Nov", 
      activities: [
        { name: "Late Pregnancy Care", status: "active", priority: "high" },
        { name: "Breeding Evaluation", status: "planning", priority: "medium" },
        { name: "Nutritional Prep", status: "optimal", priority: "medium" }
      ],
      recommendations: [
        "Prepare for winter foaling",
        "Evaluate breeding program success",
        "Plan next year's breeding schedule"
      ],
      utilization: 45
    },
    {
      name: "Winter",
      icon: <Snowflake className="h-5 w-5 text-blue-500" />,
      months: "Dec - Feb",
      activities: [
        { name: "Indoor Foaling", status: "active", priority: "high" },
        { name: "Breeding Planning", status: "planning", priority: "medium" },
        { name: "Health Maintenance", status: "critical", priority: "high" }
      ],
      recommendations: [
        "Monitor indoor air quality",
        "Maintain consistent temperatures",
        "Plan spring breeding schedule"
      ],
      utilization: 30
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-100";
      case "active": return "text-blue-600 bg-blue-100";
      case "good": return "text-yellow-600 bg-yellow-100";
      case "planning": return "text-purple-600 bg-purple-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasons.map((season) => (
          <Card key={season.name}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {season.icon}
                {season.name}
                <Badge variant="outline" className="ml-auto">
                  {season.months}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Utilization */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Season Utilization</span>
                  <span className="font-medium">{season.utilization}%</span>
                </div>
                <Progress value={season.utilization} className="h-2" />
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Key Activities</h4>
                {season.activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm font-medium">{activity.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(activity.priority) as any} className="text-xs">
                        {activity.priority}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recommendations</h4>
                <ul className="space-y-1">
                  {season.recommendations.map((rec, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Yearly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Breeding Cycle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-1 h-8">
              {[...Array(12)].map((_, month) => {
                const seasonIndex = Math.floor(month / 3);
                const season = seasons[seasonIndex];
                return (
                  <div
                    key={month}
                    className="rounded text-xs flex items-center justify-center font-medium text-white"
                    style={{
                      backgroundColor: season.name === "Spring" ? "#10b981" :
                                     season.name === "Summer" ? "#f59e0b" :
                                     season.name === "Fall" ? "#f97316" : "#3b82f6"
                    }}
                  >
                    {month + 1}
                  </div>
                );
              })}
            </div>
            
            <div className="text-sm text-muted-foreground text-center">
              Months 1-12 showing seasonal breeding intensity and focus areas
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">45</div>
                <p className="text-xs text-muted-foreground">Total Planned Breedings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">38</div>
                <p className="text-xs text-muted-foreground">Expected Foalings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <p className="text-xs text-muted-foreground">Peak Activity Weeks</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <p className="text-xs text-muted-foreground">Success Rate Target</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalPlanning;
