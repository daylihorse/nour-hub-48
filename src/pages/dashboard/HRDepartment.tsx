
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HRDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HR Department</h1>
        <p className="text-muted-foreground">Manage employees, schedules, and payroll</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing human resources, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Employee records</li>
            <li>Work schedules</li>
            <li>Payroll</li>
            <li>Performance reviews</li>
            <li>Training records</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDepartment;
