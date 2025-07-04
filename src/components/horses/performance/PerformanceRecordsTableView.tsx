
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

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

interface PerformanceRecordsTableViewProps {
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

const PerformanceRecordsTableView = ({ records }: PerformanceRecordsTableViewProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.eventName}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge className={getEventTypeColor(record.eventType)}>
                    {record.eventType}
                  </Badge>
                </TableCell>
                <TableCell>{record.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {record.discipline}
                  </Badge>
                </TableCell>
                <TableCell>
                  {record.placement && record.totalParticipants ? (
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-yellow-600" />
                      <span className="text-sm">
                        {record.placement}/{record.totalParticipants}
                      </span>
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{record.score || '-'}</TableCell>
                <TableCell>{record.time || '-'}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {record.notes || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PerformanceRecordsTableView;
