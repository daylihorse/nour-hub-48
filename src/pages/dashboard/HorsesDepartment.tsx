
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HorsesDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Horses Department</h1>
        <p className="text-muted-foreground">Manage horses, pedigrees, and information</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Horse Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing horses, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Horse registry</li>
            <li>Pedigree tracking</li>
            <li>Performance records</li>
            <li>Health status</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorsesDepartment;
