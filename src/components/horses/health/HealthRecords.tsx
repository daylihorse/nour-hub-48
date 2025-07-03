
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Stethoscope, Pill, Plus, FileText } from "lucide-react";

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

interface HealthRecordsProps {
  horseId?: string;
  horseName?: string;
}

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    date: '2024-01-20',
    type: 'checkup',
    veterinarian: 'Dr. Smith',
    description: 'Routine health examination',
    diagnosis: 'Overall health is good',
    treatment: 'Continue current care routine',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-10',
    type: 'vaccination',
    veterinarian: 'Dr. Johnson',
    description: 'Annual vaccinations',
    medications: ['Tetanus vaccine', 'West Nile vaccine', 'Eastern Equine Encephalitis'],
    nextAppointment: '2025-01-10',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-05',
    type: 'treatment',
    veterinarian: 'Dr. Brown',
    description: 'Minor leg injury treatment',
    diagnosis: 'Superficial laceration on left foreleg',
    treatment: 'Wound cleaning and bandaging',
    medications: ['Antibiotic ointment', 'Pain relief'],
    status: 'follow_up_required'
  }
];

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

const HealthRecords = ({ horseId, horseName }: HealthRecordsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Health Records</h3>
          {horseName && (
            <p className="text-sm text-muted-foreground">Medical history for {horseName}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Records
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockHealthRecords.map((record) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
    </div>
  );
};

export default HealthRecords;
