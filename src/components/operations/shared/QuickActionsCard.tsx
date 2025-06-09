
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuickAction } from "@/types/operations";

interface QuickActionsCardProps {
  actions: QuickAction[];
}

const QuickActionsCard = ({ actions }: QuickActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link}>
                <Button variant="outline" className="h-20 flex flex-col gap-2 w-full">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm">{action.title}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
