
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Stethoscope, Pill, Activity, Plus } from "lucide-react";

interface MedicalRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId: string | null;
  mareName?: string;
}

const MedicalRecordsDialog = ({ open, onOpenChange, mareId, mareName }: MedicalRecordsDialogProps) => {
  const [activeTab, setActiveTab] = useState("records");

  // Mock medical records data
  const medicalRecords = [
    {
      id: "1",
      date: "2024-01-15",
      type: "Ultrasound",
      veterinarian: "Dr. Smith",
      findings: "Pregnancy confirmed at 45 days",
      status: "normal"
    },
    {
      id: "2", 
      date: "2024-01-01",
      type: "Routine Checkup",
      veterinarian: "Dr. Johnson",
      findings: "Good overall health, ready for breeding",
      status: "normal"
    },
    {
      id: "3",
      date: "2023-12-15",
      type: "Vaccination",
      veterinarian: "Dr. Brown",
      findings: "Annual vaccinations completed",
      status: "completed"
    }
  ];

  const upcomingAppointments = [
    {
      id: "1",
      date: "2024-02-15",
      type: "Ultrasound Follow-up",
      veterinarian: "Dr. Smith",
      status: "scheduled"
    },
    {
      id: "2",
      date: "2024-03-01", 
      type: "Pregnancy Check",
      veterinarian: "Dr. Johnson",
      status: "scheduled"
    }
  ];

  const medications = [
    {
      id: "1",
      name: "Prenatal Vitamins",
      dosage: "2 tablets daily",
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      status: "active"
    },
    {
      id: "2",
      name: "Folic Acid",
      dosage: "1 tablet daily", 
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "scheduled": return "bg-yellow-100 text-yellow-800";
      case "active": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records - {mareName || `Mare ${mareId}`}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="summary">Health Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="records" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Medical Records History</h3>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Record
              </Button>
            </div>
            <div className="space-y-3">
              {medicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="h-4 w-4" />
                          <h4 className="font-semibold">{record.type}</h4>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Date: {new Date(record.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Veterinarian: {record.veterinarian}
                        </p>
                        <p className="text-sm">{record.findings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              <Button size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Appointment
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4" />
                          <h4 className="font-semibold">{appointment.type}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} - {appointment.veterinarian}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Current Medications</h3>
              <Button size="sm" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Add Medication
              </Button>
            </div>
            <div className="space-y-3">
              {medications.map((medication) => (
                <Card key={medication.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Pill className="h-4 w-4" />
                          <h4 className="font-semibold">{medication.name}</h4>
                          <Badge className={getStatusColor(medication.status)}>
                            {medication.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Dosage: {medication.dosage}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {new Date(medication.startDate).toLocaleDateString()} - {new Date(medication.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <h3 className="text-lg font-semibold">Health Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Activity className="h-4 w-4" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Overall health: <span className="font-semibold text-green-600">Good</span></p>
                  <p className="text-sm">Pregnancy status: <span className="font-semibold text-blue-600">Pregnant (Day 60)</span></p>
                  <p className="text-sm">Last checkup: <span className="font-semibold">Jan 15, 2024</span></p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-4 w-4" />
                    Next Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Next appointment: <span className="font-semibold">Feb 15, 2024</span></p>
                  <p className="text-sm">Medication review: <span className="font-semibold">Feb 1, 2024</span></p>
                  <p className="text-sm">Expected foaling: <span className="font-semibold text-purple-600">Apr 15, 2024</span></p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordsDialog;
