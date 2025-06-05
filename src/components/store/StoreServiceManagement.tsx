import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Wrench } from "lucide-react";
import { storeService } from "@/services/storeService";
import { StoreService } from "@/types/store";
import AddStoreServiceDialog from "./AddStoreServiceDialog";

interface StoreServiceManagementProps {
  department: string;
}

const StoreServiceManagement = ({ department }: StoreServiceManagementProps) => {
  const [services, setServices] = useState<StoreService[]>(storeService.getServices(department));
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleToggleActive = (serviceId: string, isActive: boolean) => {
    const updatedService = storeService.updateService(serviceId, { isActive });
    if (updatedService) {
      setServices(prev => prev.map(s => s.id === serviceId ? updatedService : s));
    }
  };

  const handleServiceAdded = (service: StoreService) => {
    setServices(prev => [...prev, service]);
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Service Management</h3>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
                <Switch
                  checked={service.isActive}
                  onCheckedChange={(checked) => handleToggleActive(service.id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Price:</span>
                  <span className="font-semibold">${service.price.toFixed(2)}</span>
                </div>
                {service.duration && (
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span>{service.duration} min</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {services.length === 0 && (
          <div className="col-span-full text-center py-8">
            <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No services added yet. Click "Add Service" to get started.</p>
          </div>
        )}
      </div>

      <AddStoreServiceDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        department={department}
        onServiceAdded={handleServiceAdded}
      />
    </div>
  );
};

export default StoreServiceManagement;
