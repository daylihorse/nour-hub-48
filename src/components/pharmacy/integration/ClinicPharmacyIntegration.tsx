
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Hospital,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  Pill
} from "lucide-react";

const ClinicPharmacyIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const clinicPrescriptions = [
    {
      id: "CP001",
      prescriptionId: "RX2024-015",
      horseName: "Thunder",
      horseId: "H001",
      veterinarian: "Dr. Sarah Smith",
      visitDate: "2024-01-15",
      diagnosis: "Respiratory infection",
      medications: [
        { name: "Penicillin Injectable", dosage: "5ml IM", frequency: "Once daily", duration: "7 days" },
        { name: "Banamine Paste", dosage: "One tube", frequency: "As needed", duration: "PRN" }
      ],
      status: "pending_dispense",
      urgency: "normal",
      notes: "Horse showing improvement, complete full course"
    },
    {
      id: "CP002",
      prescriptionId: "RX2024-016",
      horseName: "Lightning",
      horseId: "H002",
      veterinarian: "Dr. Mike Johnson",
      visitDate: "2024-01-14",
      diagnosis: "Joint inflammation",
      medications: [
        { name: "Dexamethasone", dosage: "20mg IV", frequency: "Once daily", duration: "5 days" }
      ],
      status: "dispensed",
      urgency: "high",
      dispensedDate: "2024-01-14",
      dispensedBy: "Pharmacy Tech - Alex"
    },
    {
      id: "CP003",
      prescriptionId: "RX2024-017",
      horseName: "Storm",
      horseId: "H003",
      veterinarian: "Dr. Sarah Smith",
      visitDate: "2024-01-13",
      diagnosis: "Preventive care",
      medications: [
        { name: "Vitamin E & Selenium", dosage: "10ml IM", frequency: "Monthly", duration: "Ongoing" }
      ],
      status: "auto_dispensed",
      urgency: "low",
      autoDispenseReason: "Routine vaccination protocol"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_dispense": return "secondary";
      case "dispensed": return "default";
      case "auto_dispensed": return "outline";
      default: return "secondary";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-red-500";
      case "normal": return "text-orange-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const filteredPrescriptions = clinicPrescriptions.filter(prescription => {
    const matchesSearch = prescription.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.veterinarian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Hospital className="h-6 w-6 text-blue-500" />
            Clinic-Pharmacy Integration
          </h2>
          <p className="text-muted-foreground">Manage prescriptions from clinic visits</p>
        </div>
        <Button>
          <CheckCircle className="h-4 w-4 mr-2" />
          Process All Pending
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_dispense">Pending Dispense</SelectItem>
                <SelectItem value="dispensed">Dispensed</SelectItem>
                <SelectItem value="auto_dispensed">Auto Dispensed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {prescription.prescriptionId}
                    <Badge className={getUrgencyColor(prescription.urgency)}>
                      {prescription.urgency} priority
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {prescription.horseName}
                    </span>
                    <span>Dr: {prescription.veterinarian}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prescription.visitDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(prescription.status)} className="mb-2">
                    {prescription.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Diagnosis</p>
                  <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Prescribed Medications</p>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {med.dosage} - {med.frequency} for {med.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Notes</p>
                    <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                  </div>
                )}

                {prescription.status === "dispensed" && prescription.dispensedDate && (
                  <div>
                    <p className="text-sm font-medium mb-1">Dispensed Information</p>
                    <p className="text-sm text-muted-foreground">
                      {prescription.dispensedDate} by {prescription.dispensedBy}
                    </p>
                  </div>
                )}

                {prescription.status === "auto_dispensed" && (
                  <div>
                    <p className="text-sm font-medium mb-1">Auto-Dispensed</p>
                    <p className="text-sm text-muted-foreground">{prescription.autoDispenseReason}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    View Clinical Notes
                  </Button>
                  {prescription.status === "pending_dispense" && (
                    <Button size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Dispense Now
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <User className="h-3 w-3 mr-1" />
                    Update Horse Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Hospital className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No clinic prescriptions found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClinicPharmacyIntegration;
