
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CalendarDays, Clock, Plus, Target } from "lucide-react";
import BreedingCalendar from "./components/BreedingCalendar";
import SeasonalPlanning from "./components/SeasonalPlanning";
import BreedingGoals from "./components/BreedingGoals";
import OptimalTimingAnalysis from "./components/OptimalTimingAnalysis";

const BreedingPlanner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const upcomingEvents = [
    {
      id: "1",
      type: "breeding",
      horse: "Whisper",
      mate: "Thunder",
      date: "2024-01-20",
      status: "scheduled",
      method: "natural"
    },
    {
      id: "2", 
      type: "ultrasound",
      horse: "Grace",
      date: "2024-01-25",
      status: "confirmed",
      veterinarian: "Dr. Johnson"
    },
    {
      id: "3",
      type: "foaling",
      horse: "Luna",
      expectedDate: "2024-03-15",
      status: "monitoring",
      daysRemaining: 54
    }
  ];

  const breedingGoals = [
    {
      id: "1",
      title: "Performance Horse Development",
      target: "3 high-performance foals",
      progress: 33,
      deadline: "2024-12-31",
      priority: "high"
    },
    {
      id: "2", 
      title: "Genetic Diversity Enhancement",
      target: "Introduce 2 new bloodlines",
      progress: 50,
      deadline: "2024-06-30",
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Breeding Planner</h2>
          <p className="text-muted-foreground">
            Strategic breeding planning and schedule management
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Breeding Plan
        </Button>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Scheduled Breedings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CalendarDays className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Active Pregnancies</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Due This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">75%</div>
            <p className="text-sm text-muted-foreground">Goal Progress</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Planning</TabsTrigger>
          <TabsTrigger value="goals">Breeding Goals</TabsTrigger>
          <TabsTrigger value="analysis">Timing Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <BreedingCalendar 
            events={upcomingEvents}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </TabsContent>

        <TabsContent value="seasonal" className="mt-6">
          <SeasonalPlanning />
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <BreedingGoals goals={breedingGoals} />
        </TabsContent>

        <TabsContent value="analysis" className="mt-6">
          <OptimalTimingAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BreedingPlanner;
