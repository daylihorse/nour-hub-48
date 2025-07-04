
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Stethoscope, Pill } from "lucide-react";
import { GridSize } from "../records/RecordsViewSelector";

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

interface HealthRecordsGridViewProps {
  records: HealthRecord[];
  gridSize: GridSize;
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

const HealthRecordsGridView = ({ records, gridSize }: HealthRecordsGridViewProps) => {
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
              <CardTitle className="text-base">{record.description}</CardTitle>
              <div className="flex gap-2">
                <Badge className={getStatusColor(record.status)}>
                  {record.status.replace('_', ' ')}
                </Badge>
                <Badge className={getTypeColor(record.type)}>
                  {record.type}
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
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{record.veterinarian}</span>
              </div>
            </div>

            {record.diagnosis && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Diagnosis:
                </h4>
                <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
              </div>
            )}

            {record.treatment && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-1">Treatment:</h4>
                <p className="text-sm text-muted-foreground">{record.treatment}</p>
              </div>
            )}

            {record.medications && record.medications.length > 0 && (
              <div className="mb-3">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Medications:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {record.medications.map((medication, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {medication}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {record.nextAppointment && (
              <div>
                <h4 className="text-sm font-medium mb-1">Next Appointment:</h4>
                <p className="text-sm text-muted-foreground">{record.nextAppointment}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HealthRecordsGridView;
