
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Stethoscope } from "lucide-react";

interface MedicalRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId: string | null;
  mareName?: string;
}

const MedicalRecordsDialog = ({ open, onOpenChange, mareId, mareName }: MedicalRecordsDialogProps) => {
  // Mock medical records data
  const mockRecords = [
    {
      id: '1',
      date: '2024-01-15',
      type: 'Pregnancy Checkup',
      veterinarian: 'Dr. Sarah Wilson',
      findings: 'Healthy pregnancy progression',
      status: 'Normal'
    },
    {
      id: '2',
      date: '2023-12-01',
      type: 'Annual Vaccination',
      veterinarian: 'Dr. Michael Brown',
      findings: 'All vaccinations up to date',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-500';
      case 'Completed': return 'bg-blue-500';
      case 'Attention': return 'bg-yellow-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records - {mareName || 'Mare'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {mockRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    {record.type}
                  </CardTitle>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(record.date).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Veterinarian: </span>
                    {record.veterinarian}
                  </div>
                  <div>
                    <span className="font-medium">Findings: </span>
                    {record.findings}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              Add New Record
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordsDialog;
