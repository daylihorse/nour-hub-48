
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pill, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMedications } from "@/hooks/useMedications";

const MedicationManagement = () => {
  const { medications, loading, addMedication } = useMedications();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedications = medications.filter(medication =>
    medication.medication_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.prescribed_by.toLowerCase().includes(searchTerm.toLowerCase())
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
      case 'antibiotic': return 'bg-red-50 text-red-700 border-red-200';
      case 'anti_inflammatory': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'pain_reliever': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'supplement': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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
          <p className="text-muted-foreground">Track and manage medication records</p>
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
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{medication.medication_name}</h3>
                    <Badge className={getStatusColor(medication.status)}>
                      {medication.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(medication.medication_type)}>
                      {medication.medication_type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Dosage:</strong> {medication.dosage} - {medication.frequency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Prescribed by:</strong> {medication.prescribed_by}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Started: {new Date(medication.start_date).toLocaleDateString()}
                    </div>
                    {medication.end_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Ends: {new Date(medication.end_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  {medication.reason_for_treatment && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Reason:</strong> {medication.reason_for_treatment}
                    </p>
                  )}
                </div>
                <div className="text-right space-y-1">
                  {medication.cost && (
                    <p className="text-sm font-medium">${medication.cost}</p>
                  )}
                  {medication.route_of_administration && (
                    <p className="text-xs text-muted-foreground">
                      {medication.route_of_administration}
                    </p>
                  )}
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
