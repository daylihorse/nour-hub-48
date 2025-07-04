
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface TrainingSession {
  id: string;
  date: string;
  type: 'group' | 'individual' | 'assessment';
  trainer: string;
  duration: string;
  location: string;
  activities: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface TrainingRecordsListViewProps {
  sessions: TrainingSession[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'individual':
      return 'bg-purple-100 text-purple-800';
    case 'group':
      return 'bg-orange-100 text-orange-800';
    case 'assessment':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TrainingRecordsListView = ({ sessions }: TrainingRecordsListViewProps) => {
  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{session.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.trainer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.location}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
                <Badge className={getTypeColor(session.type)}>
                  {session.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Activities:</span>
              <div className="flex flex-wrap gap-1">
                {session.activities.map((activity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {session.notes && (
              <p className="text-sm text-muted-foreground">{session.notes}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrainingRecordsListView;
