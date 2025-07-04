
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HealthRecord {
  id: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'surgery' | 'dental';
  veterinarian: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  nextAppointment?: string;
  status: 'completed' | 'ongoing' | 'follow_up_required';
}

interface HealthRecordsTableViewProps {
  records: HealthRecord[];
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'checkup':
      return 'bg-blue-100 text-blue-800';
    case 'vaccination':
      return 'bg-green-100 text-green-800';
    case 'treatment':
      return 'bg-orange-100 text-orange-800';
    case 'surgery':
      return 'bg-red-100 text-red-800';
    case 'dental':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'ongoing':
      return 'bg-yellow-100 text-yellow-800';
    case 'follow_up_required':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const HealthRecordsTableView = ({ records }: HealthRecordsTableViewProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Veterinarian</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Treatment</TableHead>
              <TableHead>Medications</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Appointment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.date}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(record.type)}>
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.veterinarian}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {record.diagnosis || '-'}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {record.treatment || '-'}
                </TableCell>
                <TableCell>
                  {record.medications && record.medications.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {record.medications.map((medication, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {medication}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{record.nextAppointment || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HealthRecordsTableView;
