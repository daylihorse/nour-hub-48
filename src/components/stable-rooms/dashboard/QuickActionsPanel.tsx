
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, Wrench, BarChart3 } from "lucide-react";

const QuickActionsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Building className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Wrench className="mr-2 h-4 w-4" />
          Schedule Maintenance
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
