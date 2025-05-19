
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LaboratoryDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Department</h1>
        <p className="text-muted-foreground">Manage tests, samples, and results</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing laboratory work, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Test requests</li>
            <li>Sample tracking</li>
            <li>Test results</li>
            <li>Lab reports</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaboratoryDepartment;
