
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, Eye, Plus, User, Calendar } from "lucide-react";

interface PrescriptionSalesWorkflowProps {
  onAddToCart: (item: any, type: 'product' | 'service') => void;
  onStateChange: (updates: any) => void;
  posState: any;
}

const PrescriptionSalesWorkflow = ({ 
  onAddToCart, 
  onStateChange, 
  posState 
}: PrescriptionSalesWorkflowProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const mockPrescriptions = [
    {
      id: "RX001",
      prescriptionNumber: "RX2024-001",
      horseName: "Thunder",
      clientName: "John Wilson",
      veterinarianName: "Dr. Sarah Smith",
      prescriptionDate: "2024-01-15",
      status: "pending",
      medications: [
        { name: "Penicillin Injectable", quantity: 2, dosage: "5ml IM once daily", price: 28.75 },
        { name: "Banamine Paste", quantity: 1, dosage: "One tube orally as needed", price: 45.00 }
      ],
      totalAmount: 102.50
    },
    {
      id: "RX002", 
      prescriptionNumber: "RX2024-002",
      horseName: "Lightning",
      clientName: "Sarah Davis",
      veterinarianName: "Dr. Mike Johnson",
      prescriptionDate: "2024-01-14",
      status: "partially_dispensed",
      medications: [
        { name: "Vitamin E & Selenium", quantity: 1, dosage: "10ml IM monthly", price: 35.50 }
      ],
      totalAmount: 35.50
    }
  ];

  const filteredPrescriptions = mockPrescriptions.filter(prescription =>
    prescription.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrescriptionToCart = (prescription: any) => {
    onStateChange({ 
      prescriptionId: prescription.id,
      saleType: 'prescription',
      client: { 
        id: `client_${prescription.id}`,
        name: prescription.clientName,
        email: `${prescription.clientName.toLowerCase().replace(' ', '.')}@email.com`
      }
    });

    prescription.medications.forEach((med: any) => {
      const medicationItem = {
        id: `med_${med.name.replace(/\s+/g, '_').toLowerCase()}`,
        name: med.name,
        price: med.price,
        description: `Prescription medication - ${med.dosage}`,
        requiresPrescription: true,
        controlledSubstance: med.name.includes('Tramadol') || med.name.includes('Morphine'),
      };
      
      for (let i = 0; i < med.quantity; i++) {
        onAddToCart(medicationItem, 'product');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Prescription Sales Workflow
        </h3>
        <p className="text-muted-foreground">
          Select a prescription to dispense medications
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Prescription */}
      {posState.prescriptionId && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm text-blue-900">
              Active Prescription: #{posState.prescriptionId}
            </CardTitle>
          </CardHeader>
        </Card>
      )}

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
                  <Badge variant={prescription.status === 'pending' ? 'secondary' : 'outline'}>
                    {prescription.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-lg font-semibold mt-1">${prescription.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Veterinarian</p>
                  <p className="text-sm text-muted-foreground">{prescription.veterinarianName}</p>
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
                          <div className="text-right">
                            <span className="text-sm font-medium">${med.price.toFixed(2)}</span>
                            <p className="text-xs text-muted-foreground">Qty: {med.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  {prescription.status === 'pending' && (
                    <Button 
                      size="sm"
                      onClick={() => handleAddPrescriptionToCart(prescription)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add to Cart
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
            <p className="text-muted-foreground">No prescriptions found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionSalesWorkflow;
