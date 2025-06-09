
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Search, User, Calendar, AlertTriangle } from "lucide-react";
import { PharmacyPOSState } from "@/types/pharmacyPOS";

interface PrescriptionSalesWorkflowProps {
  onAddToCart: (item: any, type: 'product' | 'service') => void;
  onStateChange: (updates: Partial<PharmacyPOSState>) => void;
  posState: Partial<PharmacyPOSState>;
}

const PrescriptionSalesWorkflow = ({ onAddToCart, onStateChange, posState }: PrescriptionSalesWorkflowProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  // Mock prescriptions data
  const mockPrescriptions = [
    {
      id: "RX001",
      prescriptionNumber: "RX-2024-001",
      horseId: "H001",
      horseName: "Thunder",
      veterinarianName: "Dr. Smith",
      clientName: "John Doe",
      clientId: "C001",
      prescriptionDate: new Date("2024-01-15"),
      status: "pending",
      medications: [
        {
          id: "M001",
          pharmacyItemId: "pharm_2",
          medicationName: "Banamine Paste",
          dosage: "1 tube",
          frequency: "Once daily",
          duration: "5 days",
          quantity: 5,
          quantityDispensed: 0,
          unitPrice: 45.00,
          totalPrice: 225.00,
          instructions: "Apply to gums as needed for pain relief"
        }
      ],
      totalAmount: 225.00,
      diagnosis: "Post-surgical pain management"
    },
    {
      id: "RX002",
      prescriptionNumber: "RX-2024-002",
      horseId: "H002",
      horseName: "Star",
      veterinarianName: "Dr. Johnson",
      clientName: "Jane Smith",
      clientId: "C002",
      prescriptionDate: new Date("2024-01-16"),
      status: "pending",
      medications: [
        {
          id: "M002",
          pharmacyItemId: "pharm_3",
          medicationName: "Penicillin Injectable",
          dosage: "10ml",
          frequency: "Twice daily",
          duration: "7 days",
          quantity: 14,
          quantityDispensed: 0,
          unitPrice: 28.75,
          totalPrice: 402.50,
          instructions: "Intramuscular injection, rotate injection sites"
        }
      ],
      totalAmount: 402.50,
      diagnosis: "Bacterial infection"
    }
  ];

  const filteredPrescriptions = mockPrescriptions.filter(prescription =>
    prescription.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrescriptionSelect = (prescription: any) => {
    setSelectedPrescription(prescription);
    onStateChange({
      prescriptionId: prescription.id,
      saleType: 'prescription',
      client: {
        id: prescription.clientId,
        name: prescription.clientName,
        email: `${prescription.clientName.toLowerCase().replace(' ', '.')}@email.com`,
        phone: "555-0123",
        pickupNotifications: true
      }
    });
  };

  const handleDispenseMedication = (medication: any) => {
    // Find the actual pharmacy item
    const pharmacyItem = {
      id: medication.pharmacyItemId,
      name: medication.medicationName,
      price: medication.unitPrice,
      requiresPrescription: true,
      category: "Prescription",
      stock: 50
    };

    // Add to cart with prescription quantity
    for (let i = 0; i < medication.quantity; i++) {
      onAddToCart(pharmacyItem, 'product');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Prescription Sales Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions by number, horse, or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 max-h-64 overflow-y-auto">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPrescription?.id === prescription.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handlePrescriptionSelect(prescription)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{prescription.prescriptionNumber}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{prescription.clientName} - {prescription.horseName}</span>
                      </div>
                    </div>
                    <Badge variant={prescription.status === 'pending' ? 'outline' : 'secondary'}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prescription.prescriptionDate.toLocaleDateString()}
                    </div>
                    <span>Dr. {prescription.veterinarianName}</span>
                    <span>${prescription.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPrescription && (
        <Card>
          <CardHeader>
            <CardTitle>Prescription Details - {selectedPrescription.prescriptionNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Patient:</Label>
                  <p>{selectedPrescription.horseName}</p>
                </div>
                <div>
                  <Label className="font-medium">Client:</Label>
                  <p>{selectedPrescription.clientName}</p>
                </div>
                <div>
                  <Label className="font-medium">Veterinarian:</Label>
                  <p>Dr. {selectedPrescription.veterinarianName}</p>
                </div>
                <div>
                  <Label className="font-medium">Date:</Label>
                  <p>{selectedPrescription.prescriptionDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="font-medium">Diagnosis:</Label>
                <p className="text-sm">{selectedPrescription.diagnosis}</p>
              </div>

              <Separator />

              <div>
                <Label className="font-medium mb-2 block">Medications:</Label>
                <div className="space-y-3">
                  {selectedPrescription.medications.map((medication: any) => (
                    <div key={medication.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{medication.medicationName}</h5>
                          <p className="text-sm text-muted-foreground">
                            {medication.dosage} - {medication.frequency} for {medication.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${medication.totalPrice.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {medication.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {medication.instructions}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleDispenseMedication(medication)}
                        className="w-full"
                      >
                        Dispense to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedPrescription && filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No prescriptions found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionSalesWorkflow;
