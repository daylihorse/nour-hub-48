
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinanceDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Finance Department</h1>
        <p className="text-muted-foreground">Manage income, expenses, and assets</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing finances, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Income tracking</li>
            <li>Expense management</li>
            <li>Asset registry</li>
            <li>Financial reports</li>
            <li>Budget planning</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDepartment;
