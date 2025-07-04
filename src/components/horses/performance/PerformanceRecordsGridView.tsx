
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, MapPin, Clock } from "lucide-react";
import { GridSize } from "../records/RecordsViewSelector";

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

interface PerformanceRecordsGridViewProps {
  records: PerformanceRecord[];
  gridSize: GridSize;
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

const PerformanceRecordsGridView = ({ records, gridSize }: PerformanceRecordsGridViewProps) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 ${gridCols[gridSize]}`}>
      {records.map((record) => (
        <Card key={record.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base">{record.eventName}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
                <Badge className={getEventTypeColor(record.eventType)}>
                  {record.eventType}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{record.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{record.location}</span>
              </div>
            </div>

            <div className="mb-3">
              <Badge variant="outline" className="text-xs">
                {record.discipline}
              </Badge>
            </div>

            {record.placement && record.totalParticipants && (
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">
                  Placed {record.placement} out of {record.totalParticipants}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-2 mb-3">
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
              <div>
                <h4 className="text-sm font-medium mb-1">Notes:</h4>
                <p className="text-sm text-muted-foreground">{record.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceRecordsGridView;
