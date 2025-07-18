
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pill, Calendar, Search, User, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMedications } from "@/hooks/useMedications";

const MedicationManagement = () => {
  const { medications, loading, addMedication } = useMedications();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedications = medications.filter(medication =>
    medication.medication_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.prescribed_by.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.medication_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'antibiotic': return 'bg-purple-100 text-purple-800';
      case 'anti_inflammatory': return 'bg-orange-100 text-orange-800';
      case 'pain_reliever': return 'bg-red-100 text-red-800';
      case 'supplement': return 'bg-green-100 text-green-800';
      case 'dewormer': return 'bg-blue-100 text-blue-800';
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
          <h2 className="text-2xl font-bold">Medication Management</h2>
          <p className="text-muted-foreground">Track and manage medication records and treatments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredMedications.map((medication) => (
          <Card key={medication.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{medication.medication_name}</h3>
                    <Badge className={getStatusColor(medication.status)}>
                      {medication.status}
                    </Badge>
                    <Badge className={getTypeColor(medication.medication_type)}>
                      {medication.medication_type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="space-y-1">
                      <p><strong>Dosage:</strong> {medication.dosage}</p>
                      <p><strong>Frequency:</strong> {medication.frequency}</p>
                      {medication.route_of_administration && (
                        <p><strong>Route:</strong> {medication.route_of_administration}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Prescribed by: {medication.prescribed_by}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Start: {new Date(medication.start_date).toLocaleDateString()}</span>
                      </div>
                      {medication.end_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>End: {new Date(medication.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {medication.reason_for_treatment && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Reason:</strong> {medication.reason_for_treatment}
                      </p>
                    </div>
                  )}

                  {medication.instructions && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Instructions:</strong> {medication.instructions}
                      </p>
                    </div>
                  )}

                  {medication.side_effects && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-red-600">
                        <strong>Side Effects:</strong> {medication.side_effects}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right space-y-1">
                  {medication.cost && (
                    <p className="text-sm font-medium">${medication.cost}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Added {new Date(medication.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMedications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Pill className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No medications found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No medications match your search." : "Start by adding medication records."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Medication
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicationManagement;
