
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HorseMovements = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arrivals & Departures</h1>
        <p className="text-muted-foreground">Manage horse movements and transportation</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Horse Movement Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing horse movements, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Arrival records</li>
            <li>Departure records</li>
            <li>Transportation scheduling</li>
            <li>Movement history</li>
            <li>Health certificates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default HorseMovements;
