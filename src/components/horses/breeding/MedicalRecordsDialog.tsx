
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Stethoscope, Pill, Activity, Plus } from "lucide-react";
import VetCheckupDialog from "./VetCheckupDialog";
import ScheduleAppointmentDialog from "./ScheduleAppointmentDialog";
import AddMedicationDialog from "./AddMedicationDialog";
import UltrasoundDialog from "./UltrasoundDialog";
import { useRecords } from "./records/RecordsProvider";
import { getRecordStatusColor, getRecordTypeLabel } from "./records/utils/recordUtils";

interface MedicalRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mareId: string | null;
  mareName?: string;
}

const MedicalRecordsDialog = ({ open, onOpenChange, mareId, mareName }: MedicalRecordsDialogProps) => {
  const { getRecordsByHorse, records } = useRecords();
  const [activeTab, setActiveTab] = useState("records");
  
  // Dialog states
  const [vetCheckupDialog, setVetCheckupDialog] = useState(false);
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  const [medicationDialog, setMedicationDialog] = useState(false);
  const [ultrasoundDialog, setUltrasoundDialog] = useState(false);

  // Get records for this horse
  const horseRecords = mareId ? getRecordsByHorse(mareId) : [];
  
  // Filter records by type
  const medicalRecords = horseRecords.filter(record => 
    ['veterinary_checkup', 'ultrasound', 'health_assessment'].includes(record.type)
  );
  
  const appointments = horseRecords.filter(record => 
    record.type === 'appointment' && record.status === 'scheduled'
  );
  
  const medications = horseRecords.filter(record => 
    record.type === 'medication' && ['scheduled', 'in_progress'].includes(record.status)
  );

  return (
    <>
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
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setUltrasoundDialog(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule Ultrasound
                  </Button>
                  <Button size="sm" onClick={() => setVetCheckupDialog(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Record
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                {medicalRecords.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No medical records found for this horse.</p>
                    </CardContent>
                  </Card>
                ) : (
                  medicalRecords.map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Stethoscope className="h-4 w-4" />
                              <h4 className="font-semibold">{record.title}</h4>
                              <Badge className={getRecordStatusColor(record.status)}>
                                {record.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Date: {record.scheduledDate?.toLocaleDateString() || record.createdAt.toLocaleDateString()}
                            </p>
                            {record.veterinarian && (
                              <p className="text-sm text-muted-foreground mb-2">
                                Veterinarian: {record.veterinarian}
                              </p>
                            )}
                            {record.description && (
                              <p className="text-sm">{record.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                <Button size="sm" onClick={() => setAppointmentDialog(true)} className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Appointment
                </Button>
              </div>
              
              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No upcoming appointments for this horse.</p>
                    </CardContent>
                  </Card>
                ) : (
                  appointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="h-4 w-4" />
                              <h4 className="font-semibold">{appointment.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {appointment.scheduledDate?.toLocaleDateString()} - {appointment.assignedTo || 'Unassigned'}
                            </p>
                            {appointment.location && (
                              <p className="text-sm text-muted-foreground">
                                Location: {appointment.location}
                              </p>
                            )}
                          </div>
                          <Badge className={getRecordStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Current Medications</h3>
                <Button size="sm" onClick={() => setMedicationDialog(true)} className="flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Add Medication
                </Button>
              </div>
              
              <div className="space-y-3">
                {medications.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No current medications for this horse.</p>
                    </CardContent>
                  </Card>
                ) : (
                  medications.map((medication) => (
                    <Card key={medication.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="h-4 w-4" />
                              <h4 className="font-semibold">{medication.title}</h4>
                              <Badge className={getRecordStatusColor(medication.status)}>
                                {medication.status}
                              </Badge>
                            </div>
                            {medication.description && (
                              <p className="text-sm text-muted-foreground mb-1">
                                {medication.description}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Started: {medication.scheduledDate?.toLocaleDateString() || medication.createdAt.toLocaleDateString()}
                            </p>
                            {medication.dueDate && (
                              <p className="text-sm text-muted-foreground">
                                Ends: {medication.dueDate.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
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
                    <p className="text-sm">Total Records: <span className="font-semibold">{horseRecords.length}</span></p>
                    <p className="text-sm">Medical Records: <span className="font-semibold">{medicalRecords.length}</span></p>
                    <p className="text-sm">Active Medications: <span className="font-semibold">{medications.length}</span></p>
                    <p className="text-sm">Upcoming Appointments: <span className="font-semibold">{appointments.length}</span></p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Calendar className="h-4 w-4" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {horseRecords.length > 0 ? (
                      <div className="space-y-2">
                        {horseRecords
                          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                          .slice(0, 3)
                          .map((record) => (
                            <div key={record.id} className="text-sm">
                              <span className="font-medium">{getRecordTypeLabel(record.type)}</span>
                              <span className="text-muted-foreground ml-2">
                                {record.updatedAt.toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    )}
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

      {/* Sub-dialogs */}
      <VetCheckupDialog
        open={vetCheckupDialog}
        onOpenChange={setVetCheckupDialog}
        pregnancyId={null}
        horseId={mareId}
        horseName={mareName}
      />

      <ScheduleAppointmentDialog
        open={appointmentDialog}
        onOpenChange={setAppointmentDialog}
        mareId={mareId}
        mareName={mareName}
      />

      <AddMedicationDialog
        open={medicationDialog}
        onOpenChange={setMedicationDialog}
        mareId={mareId}
        mareName={mareName}
      />

      <UltrasoundDialog
        open={ultrasoundDialog}
        onOpenChange={setUltrasoundDialog}
        pregnancyId={null}
        horseId={mareId}
        horseName={mareName}
      />
    </>
  );
};

export default MedicalRecordsDialog;
