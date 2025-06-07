
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventItem {
  id: number;
  type: string;
  title: string;
  horse: string;
  date: string;
  priority: string;
}

interface BreedingUpcomingEventsProps {
  events: EventItem[];
}

const BreedingUpcomingEvents = ({ events }: BreedingUpcomingEventsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{event.title}</span>
                  <Badge variant={getPriorityColor(event.priority) as any} className="text-xs">
                    {event.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.horse}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BreedingUpcomingEvents;
