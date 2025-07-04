
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

interface TrainingRecordsTableViewProps {
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

const TrainingRecordsTableView = ({ sessions }: TrainingRecordsTableViewProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Activities</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.date}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(session.type)}>
                    {session.type}
                  </Badge>
                </TableCell>
                <TableCell>{session.trainer}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>{session.location}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {session.activities.map((activity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {session.notes || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrainingRecordsTableView;
