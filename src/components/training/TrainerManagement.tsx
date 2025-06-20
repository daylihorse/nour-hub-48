
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Search, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTrainers } from "@/hooks/useTrainers";

const TrainerManagement = () => {
  const { trainers, loading } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrainers = trainers.filter(trainer =>
    `${trainer.first_name} ${trainer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
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
          <h2 className="text-2xl font-bold">Trainer Management</h2>
          <p className="text-muted-foreground">Manage trainer profiles and schedules</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search trainers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTrainers.map((trainer) => (
          <Card key={trainer.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold">{trainer.first_name} {trainer.last_name}</h3>
                    <Badge className={getStatusColor(trainer.status)}>
                      {trainer.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="space-y-1">
                      {trainer.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{trainer.email}</span>
                        </div>
                      )}
                      {trainer.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{trainer.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {trainer.experience_years && (
                        <p><strong>Experience:</strong> {trainer.experience_years} years</p>
                      )}
                      {trainer.hourly_rate && (
                        <p><strong>Rate:</strong> ${trainer.hourly_rate}/hour</p>
                      )}
                    </div>
                  </div>

                  {trainer.specializations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {trainer.certifications.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTrainers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No trainers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "No trainers match your search." : "Start by adding trainer profiles."}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Trainer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainerManagement;
