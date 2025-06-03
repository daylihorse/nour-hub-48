
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileText, Settings } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "New Sample",
      description: "Register a new sample for testing",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Search Tests",
      description: "Find existing test results",
      icon: Search,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Generate Report",
      description: "Create laboratory reports",
      icon: FileText,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Equipment Check",
      description: "Review equipment status",
      icon: Settings,
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
