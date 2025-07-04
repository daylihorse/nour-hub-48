
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { GridSize } from "../records/RecordsViewSelector";

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

interface TrainingRecordsGridViewProps {
  sessions: TrainingSession[];
  gridSize: GridSize;
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

const TrainingRecordsGridView = ({ sessions, gridSize }: TrainingRecordsGridViewProps) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 ${gridCols[gridSize]}`}>
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">Training Session</CardTitle>
              <div className="flex gap-2">
                <Badge className={getStatusColor(session.status)}>
                  {session.status}
                </Badge>
                <Badge className={getTypeColor(session.type)}>
                  {session.type}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{session.date}</span>
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
            
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-2">Activities:</h4>
              <div className="flex flex-wrap gap-1">
                {session.activities.map((activity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {session.notes && (
              <div>
                <h4 className="text-sm font-medium mb-2">Notes:</h4>
                <p className="text-sm text-muted-foreground">{session.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrainingRecordsGridView;
