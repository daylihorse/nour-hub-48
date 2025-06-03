
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TestTube2, FileText } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "sample_collected",
      message: "Blood sample collected from Thunder",
      time: "2 minutes ago",
      icon: TestTube2,
      status: "collected"
    },
    {
      id: 2,
      type: "test_completed",
      message: "CBC test completed for Bella",
      time: "15 minutes ago",
      icon: FileText,
      status: "completed"
    },
    {
      id: 3,
      type: "urgent_test",
      message: "Urgent urinalysis requested for Storm",
      time: "1 hour ago",
      icon: Clock,
      status: "urgent"
    },
    {
      id: 4,
      type: "test_completed",
      message: "Parasite screening completed for Shadow",
      time: "2 hours ago",
      icon: FileText,
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return <Badge variant="outline">Collected</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {getStatusBadge(activity.status)}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
