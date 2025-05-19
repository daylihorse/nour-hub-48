
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HorseMovementForm from "@/components/movements/HorseMovementForm";
import HorseMovementsTable from "@/components/movements/HorseMovementsTable";
import HorseMovementStats from "@/components/movements/HorseMovementStats";

const HorseMovements = () => {
  const [movements, setMovements] = useState<Movement[]>([]);

  const addMovement = (movement: Movement) => {
    setMovements((prev) => [movement, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arrivals & Departures</h1>
        <p className="text-muted-foreground">Manage horse movements and transportation</p>
      </div>
      
      <HorseMovementStats movements={movements} />
      
      <Tabs defaultValue="record">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="record">Record Movement</TabsTrigger>
          <TabsTrigger value="history">Movement History</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="record">
          <Card>
            <CardHeader>
              <CardTitle>New Movement Record</CardTitle>
              <CardDescription>
                Record a new horse arrival or departure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HorseMovementForm onSubmit={addMovement} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Movement History</CardTitle>
              <CardDescription>
                View and manage horse movement records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HorseMovementsTable movements={movements} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Movement Calendar</CardTitle>
              <CardDescription>
                View scheduled arrivals and departures
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-80">
              <p className="text-muted-foreground">Calendar view will display scheduled movements.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HorseMovements;
