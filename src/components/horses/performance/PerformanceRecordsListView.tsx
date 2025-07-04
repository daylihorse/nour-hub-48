
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, MapPin, Clock } from "lucide-react";

interface PerformanceRecord {
  id: string;
  date: string;
  eventName: string;
  eventType: 'competition' | 'training' | 'assessment' | 'show';
  location: string;
  discipline: string;
  placement?: number;
  totalParticipants?: number;
  score?: number;
  time?: string;
  notes?: string;
  status: 'completed' | 'upcoming' | 'cancelled';
}

interface PerformanceRecordsListViewProps {
  records: PerformanceRecord[];
}

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'competition':
      return 'bg-red-100 text-red-800';
    case 'training':
      return 'bg-blue-100 text-blue-800';
    case 'assessment':
      return 'bg-purple-100 text-purple-800';
    case 'show':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const PerformanceRecordsListView = ({ records }: PerformanceRecordsListViewProps) => {
  return (
    <div className="space-y-3">
      {records.map((record) => (
        <Card key={record.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-base mb-2">{record.eventName}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{record.location}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {record.discipline}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
                <Badge className={getEventTypeColor(record.eventType)}>
                  {record.eventType}
                </Badge>
              </div>
            </div>

            {record.placement && record.totalParticipants && (
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">
                  Placed {record.placement} out of {record.totalParticipants}
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 mb-2">
              {record.score && (
                <div>
                  <span className="text-sm text-muted-foreground">Score: </span>
                  <span className="text-sm font-medium">{record.score}</span>
                </div>
              )}
              {record.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{record.time}</span>
                </div>
              )}
            </div>

            {record.notes && (
              <p className="text-sm text-muted-foreground">{record.notes}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceRecordsListView;
