
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Syringe, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useVaccinations } from "@/hooks/useVaccinations";

const VaccinationManagement = () => {
  const { vaccinations, loading, addVaccination } = useVaccinations();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVaccinations = vaccinations.filter(vaccination =>
    vaccination.vaccine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaccination.administered_by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
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
          <h2 className="text-2xl font-bold">Vaccination Management</h2>
          <p className="text-muted-foreground">Track and manage vaccination records</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vaccination
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search vaccinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredVaccinations.map((vaccination) => (
          <Card key={vaccination.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Syringe className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{vaccination.vaccine_name}</h3>
                    <Badge className={getStatusColor(vaccination.status)}>
                      {vaccination.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Type: {vaccination.vaccine_type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Administered by: {vaccination.administered_by}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Given: {new Date(vaccination.vaccination_date).toLocaleDateString()}
                    </div>
                    {vaccination.next_due_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Next due: {new Date(vaccination.next_due_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  {vaccination.cost && (
                    <p className="text-sm font-medium">${vaccination.cost}</p>
                  )}
                  {vaccination.manufacturer && (
                    <p className="text-xs text-muted-foreground">{vaccination.manufacturer}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVaccinations.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Syringe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No vaccinations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No vaccinations match your search." : "Start by adding vaccination records."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Vaccination
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VaccinationManagement;
