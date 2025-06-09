
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PharmacyClient } from "@/types/pharmacyPOS";
import { 
  Users, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Bell, 
  AlertTriangle,
  Plus
} from "lucide-react";

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

  const mockClients: PharmacyClient[] = [
    {
      id: "client_1",
      name: "John Wilson",
      email: "john.wilson@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, ST 12345",
      type: "Horse Owner",
      status: "Active",
      createdAt: "2024-01-01",
      pickupNotifications: true,
      allergies: ["Penicillin"],
      currentMedications: ["Vitamin E & Selenium"],
      insuranceInfo: {
        provider: "Equine Health Insurance",
        policyNumber: "EHI-12345",
        groupNumber: "GRP-001",
        copayAmount: 15.00,
        deductibleMet: true,
        coveragePercentage: 80,
        preAuthRequired: false,
      },
      prescriptionHistory: [
        {
          id: "rx_hist_1",
          prescriptionNumber: "RX2024-001",
          medication: "Banamine Paste",
          dosage: "One tube orally as needed",
          quantity: 1,
          fillDate: new Date("2024-01-15"),
          veterinarian: "Dr. Sarah Smith",
          horseId: "H001",
          horseName: "Thunder",
        }
      ]
    },
    {
      id: "client_2",
      name: "Sarah Davis",
      email: "sarah.davis@email.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, ST 67890",
      type: "Horse Owner",
      status: "Active",
      createdAt: "2024-01-02",
      pickupNotifications: true,
      allergies: [],
      currentMedications: [],
      prescriptionHistory: []
    },
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Client Management
        </h3>
        <p className="text-muted-foreground">
          Manage client information and prescription history
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Client */}
      {selectedClient && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-sm text-green-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Selected Client: {selectedClient.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {selectedClient.email}</p>
              <p><strong>Phone:</strong> {selectedClient.phone}</p>
              {selectedClient.insuranceInfo && (
                <p><strong>Insurance:</strong> {selectedClient.insuranceInfo.provider}</p>
              )}
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  <Bell className="h-3 w-3 mr-1" />
                  Send Notification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="cursor-pointer hover:bg-muted/50">
            <CardContent className="p-4" onClick={() => onClientSelect(client)}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{client.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {client.phone}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={client.status === 'Active' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                  {client.pickupNotifications && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                      <Bell className="h-3 w-3" />
                      Notifications On
                    </div>
                  )}
                </div>
              </div>

              {/* Client Alerts */}
              {client.allergies && client.allergies.length > 0 && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Allergies:</span>
                  </div>
                  <p className="text-sm text-red-600">{client.allergies.join(", ")}</p>
                </div>
              )}

              {/* Current Medications */}
              {client.currentMedications && client.currentMedications.length > 0 && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-700">Current Medications:</p>
                  <p className="text-sm text-blue-600">{client.currentMedications.join(", ")}</p>
                </div>
              )}

              {/* Insurance Info */}
              {client.insuranceInfo && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-medium text-green-700">
                    Insurance: {client.insuranceInfo.provider}
                  </p>
                  <p className="text-xs text-green-600">
                    Coverage: {client.insuranceInfo.coveragePercentage}% | 
                    Copay: ${client.insuranceInfo.copayAmount?.toFixed(2) || 'N/A'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No clients found matching your search.</p>
            <Button className="mt-4" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientManagementPanel;
