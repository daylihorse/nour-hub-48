
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays } from "lucide-react";
import { BreedingEvent } from "@/types/breeding";

interface BreedingCalendarProps {
  events: BreedingEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const BreedingCalendar = ({ events, selectedDate, onDateSelect }: BreedingCalendarProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap = {
      scheduled: { variant: "outline" as const, label: "Scheduled" },
      confirmed: { variant: "default" as const, label: "Confirmed" },
      monitoring: { variant: "secondary" as const, label: "Monitoring" },
      completed: { variant: "outline" as const, label: "Completed" }
    };
    
    return (
      <Badge variant={statusMap[status as keyof typeof statusMap]?.variant || "outline"}>
        {statusMap[status as keyof typeof statusMap]?.label || status}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Breeding Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive calendar view coming soon</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium capitalize">{event.type}</h4>
                    <p className="text-sm text-muted-foreground">{event.horse}</p>
                  </div>
                  {getStatusBadge(event.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>Date: {event.date}</div>
                  {event.mate && <div>Mate: {event.mate}</div>}
                  {event.veterinarian && <div>Veterinarian: {event.veterinarian}</div>}
                  {event.daysRemaining && <div>{event.daysRemaining} days remaining</div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreedingCalendar;
