
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClinicDepartment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clinic Department</h1>
        <p className="text-muted-foreground">Manage veterinary visits, medical records, treatments, and breeding services</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Clinic Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing the clinic, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Veterinary visits</li>
            <li>Medical records</li>
            <li>Treatment plans</li>
            <li>Breeding services</li>
            <li>Health monitoring</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicDepartment;
