
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TrainingCenter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training Center</h1>
        <p className="text-muted-foreground">Manage training programs and schedules</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing training activities, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Training programs</li>
            <li>Exercise schedules</li>
            <li>Performance tracking</li>
            <li>Trainer assignments</li>
            <li>Training facilities</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingCenter;
