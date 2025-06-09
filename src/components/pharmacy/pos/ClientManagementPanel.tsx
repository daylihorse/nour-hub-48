import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PharmacyClient } from "@/types/pharmacyPOS";
import { Search, User, Phone, Mail, Bell, AlertTriangle, History } from "lucide-react";

interface ClientManagementPanelProps {
  selectedClient?: PharmacyClient;
  onClientSelect: (client: PharmacyClient) => void;
  onSendNotification: (clientId: string, prescriptionId: string) => void;
}

const ClientManagementPanel = ({ 
  selectedClient, 
  onClientSelect, 
  onSendNotification 
}: ClientManagementPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock clients data
  const mockClients: PharmacyClient[] = [
    {
      id: "C001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "555-0123",
      address: "123 Main St, Anytown",
      type: "Horse Owner",
      status: "Active",
      createdAt: "2024-01-01T00:00:00Z",
      pickupNotifications: true,
      insuranceInfo: {
        provider: "Equine Insurance Co.",
        policyNumber: "EQ123456",
        groupNumber: "GROUP001",
        copayAmount: 25.00,
        deductibleMet: true,
        coveragePercentage: 80,
        preAuthRequired: false
      },
      allergies: ["Penicillin", "Sulfa drugs"],
      currentMedications: ["Daily vitamin supplement"],
      prescriptionHistory: [
        {
          id: "RX001",
          prescriptionNumber: "RX-2024-001",
          medication: "Banamine Paste",
          dosage: "1 tube daily",
          quantity: 5,
          fillDate: new Date("2024-01-15"),
          veterinarian: "Dr. Smith",
          horseId: "H001",
          horseName: "Thunder"
        }
      ]
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "555-0456",
      address: "456 Oak Ave, Somewhere",
      type: "Horse Owner",
      status: "Active",
      createdAt: "2024-01-02T00:00:00Z",
      pickupNotifications: false,
      allergies: [],
      currentMedications: [],
      prescriptionHistory: [
        {
          id: "RX002",
          prescriptionNumber: "RX-2024-002",
          medication: "Penicillin Injectable",
          dosage: "10ml twice daily",
          quantity: 14,
          fillDate: new Date("2024-01-16"),
          veterinarian: "Dr. Johnson",
          horseId: "H002",
          horseName: "Star"
        }
      ]
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 max-h-64 overflow-y-auto">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedClient?.id === client.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => onClientSelect(client)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{client.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {client.insuranceInfo && (
                        <Badge variant="outline" className="text-xs">
                          Insured
                        </Badge>
                      )}
                      {client.pickupNotifications && (
                        <Badge variant="outline" className="text-xs">
                          <Bell className="h-3 w-3 mr-1" />
                          Notifications
                        </Badge>
                      )}
                      {client.allergies && client.allergies.length > 0 && (
                        <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Allergies
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClient && (
        <Card>
          <CardHeader>
            <CardTitle>Client Details - {selectedClient.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Name:</Label>
                    <p>{selectedClient.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Email:</Label>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Phone:</Label>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Address:</Label>
                    <p>{selectedClient.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="font-medium">Pickup Notifications:</Label>
                  <Badge variant={selectedClient.pickupNotifications ? "default" : "secondary"}>
                    {selectedClient.pickupNotifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </TabsContent>

              <TabsContent value="insurance" className="space-y-4">
                {selectedClient.insuranceInfo ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-medium">Provider:</Label>
                        <p>{selectedClient.insuranceInfo.provider}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Policy Number:</Label>
                        <p>{selectedClient.insuranceInfo.policyNumber}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Coverage:</Label>
                        <p>{selectedClient.insuranceInfo.coveragePercentage}%</p>
                      </div>
                      <div>
                        <Label className="font-medium">Copay:</Label>
                        <p>${selectedClient.insuranceInfo.copayAmount?.toFixed(2) || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={selectedClient.insuranceInfo.deductibleMet ? "default" : "secondary"}>
                        Deductible {selectedClient.insuranceInfo.deductibleMet ? "Met" : "Not Met"}
                      </Badge>
                      <Badge variant={selectedClient.insuranceInfo.preAuthRequired ? "destructive" : "default"}>
                        {selectedClient.insuranceInfo.preAuthRequired ? "Pre-Auth Required" : "No Pre-Auth"}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No insurance information on file.</p>
                )}
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <div>
                  <Label className="font-medium">Allergies:</Label>
                  {selectedClient.allergies && selectedClient.allergies.length > 0 ? (
                    <div className="flex gap-2 mt-1">
                      {selectedClient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="border-red-300 text-red-700">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No known allergies.</p>
                  )}
                </div>
                <div>
                  <Label className="font-medium">Current Medications:</Label>
                  {selectedClient.currentMedications && selectedClient.currentMedications.length > 0 ? (
                    <ul className="list-disc list-inside mt-1">
                      {selectedClient.currentMedications.map((med, index) => (
                        <li key={index} className="text-sm">{med}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No current medications.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {selectedClient.prescriptionHistory && selectedClient.prescriptionHistory.length > 0 ? (
                  <div className="space-y-3">
                    {selectedClient.prescriptionHistory.map((prescription) => (
                      <div key={prescription.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">{prescription.medication}</h5>
                            <p className="text-sm text-muted-foreground">
                              {prescription.horseName} - {prescription.dosage}
                            </p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>{prescription.fillDate.toLocaleDateString()}</p>
                            <p>Qty: {prescription.quantity}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {prescription.veterinarian}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onSendNotification(selectedClient.id, prescription.id)}
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Notify
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No prescription history available.</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientManagementPanel;
