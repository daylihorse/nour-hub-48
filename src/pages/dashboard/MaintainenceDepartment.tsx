
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MaintenanceDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stable Maintenance</h1>
        <p className="text-muted-foreground">Manage maintenance tasks and schedules</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing maintenance, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Routine maintenance tasks</li>
            <li>Repair requests</li>
            <li>Equipment servicing</li>
            <li>Maintenance schedules</li>
            <li>Service provider contacts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceDepartment;
