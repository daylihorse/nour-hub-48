
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  FileText, 
  User, 
  Calendar,
  DollarSign,
  Eye,
  Check
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PrescriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - in real implementation, this would come from API
  const prescriptions = [
    {
      id: "RX001",
      prescriptionNumber: "RX2024-001",
      horseName: "Thunder",
      horseId: "H001",
      veterinarianName: "Dr. Sarah Smith",
      clientName: "John Wilson",
      prescriptionDate: "2024-01-15",
      status: "pending",
      totalAmount: 125.50,
      medications: [
        { name: "Penicillin Injectable", quantity: 2, dosage: "5ml IM once daily" },
        { name: "Banamine Paste", quantity: 1, dosage: "One tube orally as needed" }
      ],
      diagnosis: "Respiratory infection"
    },
    {
      id: "RX002",
      prescriptionNumber: "RX2024-002", 
      horseName: "Lightning",
      horseId: "H002",
      veterinarianName: "Dr. Mike Johnson",
      clientName: "Sarah Davis",
      prescriptionDate: "2024-01-14",
      status: "dispensed",
      totalAmount: 89.75,
      medications: [
        { name: "Vitamin E & Selenium", quantity: 1, dosage: "10ml IM monthly" }
      ],
      diagnosis: "Nutritional supplement",
      dispensedDate: "2024-01-14",
      dispensedBy: "Pharmacy Tech - Alex"
    },
    {
      id: "RX003",
      prescriptionNumber: "RX2024-003",
      horseName: "Storm",
      horseId: "H003", 
      veterinarianName: "Dr. Sarah Smith",
      clientName: "Mike Rodriguez",
      prescriptionDate: "2024-01-13",
      status: "partially_dispensed",
      totalAmount: 215.25,
      medications: [
        { name: "Dexamethasone", quantity: 1, dosage: "20mg IV once daily x 5 days" },
        { name: "Gastrogard", quantity: 2, dosage: "One tube orally daily" }
      ],
      diagnosis: "Joint inflammation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'dispensed': return 'default';
      case 'partially_dispensed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Prescription Management</h2>
          <p className="text-muted-foreground">Manage veterinary prescriptions and dispensing</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="dispensed">Dispensed</SelectItem>
                <SelectItem value="partially_dispensed">Partially Dispensed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prescription.prescriptionNumber}</CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {prescription.horseName}
                    </span>
                    <span>Client: {prescription.clientName}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prescription.prescriptionDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(prescription.status)} className="mb-2">
                    {prescription.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-lg font-semibold">${prescription.totalAmount}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Veterinarian</p>
                  <p className="text-sm text-muted-foreground">{prescription.veterinarianName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Diagnosis</p>
                  <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Medications</p>
                  <div className="space-y-2">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="p-2 bg-muted rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{med.name}</p>
                            <p className="text-xs text-muted-foreground">{med.dosage}</p>
                          </div>
                          <span className="text-sm">Qty: {med.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.dispensedDate && (
                  <div>
                    <p className="text-sm font-medium mb-1">Dispensed Information</p>
                    <p className="text-sm text-muted-foreground">
                      {prescription.dispensedDate} by {prescription.dispensedBy}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {prescription.status === 'pending' && (
                    <Button size="sm">
                      <Check className="h-3 w-3 mr-1" />
                      Dispense
                    </Button>
                  )}
                  {prescription.status === 'partially_dispensed' && (
                    <Button size="sm" variant="outline">
                      <Check className="h-3 w-3 mr-1" />
                      Complete Dispensing
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No prescriptions found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionManagement;
