
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Heart, Stethoscope, Baby } from "lucide-react";

interface BreedingEvent {
  id: string;
  type: string;
  horse: string;
  mate?: string;
  date: string;
  status: string;
  method?: string;
  veterinarian?: string;
  expectedDate?: string;
  daysRemaining?: number;
}

interface BreedingCalendarProps {
  events: BreedingEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const BreedingCalendar = ({ events, selectedDate, onDateSelect }: BreedingCalendarProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "breeding": return <Heart className="h-4 w-4 text-red-500" />;
      case "ultrasound": return <Stethoscope className="h-4 w-4 text-blue-500" />;
      case "foaling": return <Baby className="h-4 w-4 text-green-500" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "default";
      case "confirmed": return "outline";
      case "monitoring": return "secondary";
      case "completed": return "outline";
      default: return "secondary";
    }
  };

  const getEventDates = () => {
    return events.map(event => new Date(event.date || event.expectedDate || ""));
  };

  const getTodaysEvents = () => {
    const today = selectedDate.toDateString();
    return events.filter(event => {
      const eventDate = new Date(event.date || event.expectedDate || "").toDateString();
      return eventDate === today;
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => {
        const eventDate = new Date(event.date || event.expectedDate || "");
        return eventDate > today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || a.expectedDate || "");
        const dateB = new Date(b.date || b.expectedDate || "");
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5);
  };

  const todaysEvents = getTodaysEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Breeding Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateSelect(date)}
            className="rounded-md border"
            modifiers={{
              eventDate: getEventDates()
            }}
            modifiersStyles={{
              eventDate: { 
                backgroundColor: "#3b82f6", 
                color: "white",
                fontWeight: "bold"
              }
            }}
          />
          
          {/* Today's Events */}
          {todaysEvents.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-sm">Events for {selectedDate.toLocaleDateString()}</h4>
              {todaysEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <span className="font-medium">{event.horse}</span>
                    {event.mate && <span className="text-muted-foreground">x {event.mate}</span>}
                  </div>
                  <Badge variant={getStatusColor(event.status) as any}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getEventIcon(event.type)}
                  <span className="font-medium capitalize">{event.type}</span>
                </div>
                <Badge variant={getStatusColor(event.status) as any} className="text-xs">
                  {event.status}
                </Badge>
              </div>
              
              <div className="text-sm">
                <div className="font-medium">{event.horse}</div>
                {event.mate && (
                  <div className="text-muted-foreground">with {event.mate}</div>
                )}
                <div className="text-muted-foreground">
                  {new Date(event.date || event.expectedDate || "").toLocaleDateString()}
                </div>
                {event.daysRemaining && (
                  <div className="text-xs text-orange-600">
                    {event.daysRemaining} days remaining
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          ))}

          {upcomingEvents.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No upcoming events</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingCalendar;
