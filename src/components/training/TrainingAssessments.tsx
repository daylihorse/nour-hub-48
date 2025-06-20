
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

const TrainingAssessments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training Assessments</h2>
          <p className="text-muted-foreground">Manage training assessments and progress</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Assessment Management Coming Soon</h3>
          <p className="text-muted-foreground mb-4">
            Training assessment features will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingAssessments;
