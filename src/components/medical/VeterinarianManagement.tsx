
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCheck, Phone, Mail, MapPin, Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useVeterinarians } from "@/hooks/useVeterinarians";

const VeterinarianManagement = () => {
  const { veterinarians, loading, addVeterinarian } = useVeterinarians();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVeterinarians = veterinarians.filter(vet =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (vet.specialty && vet.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vet.clinic_name && vet.clinic_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Veterinarian Management</h2>
          <p className="text-muted-foreground">Manage veterinarian contacts and information</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Veterinarian
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search veterinarians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredVeterinarians.map((vet) => (
          <Card key={vet.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{vet.name}</h3>
                    <Badge className={getStatusColor(vet.status)}>
                      {vet.status}
                    </Badge>
                    {vet.emergency_contact && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Emergency Contact
                      </Badge>
                    )}
                  </div>

                  {vet.specialty && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Specialty:</strong> {vet.specialty}
                    </p>
                  )}

                  {vet.clinic_name && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Clinic:</strong> {vet.clinic_name}
                    </p>
                  )}

                  {vet.license_number && (
                    <p className="text-sm text-muted-foreground">
                      <strong>License:</strong> {vet.license_number}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {vet.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {vet.phone}
                      </div>
                    )}
                    {vet.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {vet.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  {vet.consultation_fee && (
                    <p className="text-sm font-medium">
                      Consultation: ${vet.consultation_fee}
                    </p>
                  )}
                  {vet.travel_fee && (
                    <p className="text-sm text-muted-foreground">
                      Travel: ${vet.travel_fee}
                    </p>
                  )}
                </div>
              </div>

              {vet.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {vet.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredVeterinarians.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No veterinarians found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No veterinarians match your search." : "Start by adding veterinarian contacts."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Veterinarian
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VeterinarianManagement;
