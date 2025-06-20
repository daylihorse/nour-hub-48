
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";

const CompetitionManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Competition Management</h2>
          <p className="text-muted-foreground">Track competitions and events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Competition
        </Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Trophy className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Competition Tracking Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Competition management features will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitionManagement;
