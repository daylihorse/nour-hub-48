
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StableRooms = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stable Rooms & Warehouses</h1>
        <p className="text-muted-foreground">Manage stalls, rooms, and storage facilities</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Facility Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This section will contain tools for managing facilities, including:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Stall assignments</li>
            <li>Room management</li>
            <li>Warehouse inventory</li>
            <li>Facility occupancy</li>
            <li>Space planning</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StableRooms;
