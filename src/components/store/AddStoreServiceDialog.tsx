
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { storeService } from "@/services/storeService";
import { StoreService } from "@/types/store";
import { useToast } from "@/hooks/use-toast";

interface AddStoreServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: string;
  onServiceAdded: (service: StoreService) => void;
}

const AddStoreServiceDialog = ({ open, onOpenChange, department, onServiceAdded }: AddStoreServiceDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    duration: "",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  });

  const categories = {
    inventory: ["Equipment Rental", "Maintenance", "Consultation"],
    laboratory: ["Testing Services", "Analysis", "Consultation", "Equipment Rental"],
    clinic: ["Veterinary Services", "Surgery", "Consultation", "Emergency Care"],
    marketplace: ["General Services", "Consultation", "Support"],
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const service = storeService.addService({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      department: department as any,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      availability: formData.availability,
      isActive: true,
    });

    onServiceAdded(service);
    
    toast({
      title: "Service Added",
      description: `${service.name} has been added to your store.`,
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      duration: "",
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Service Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter service name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter service description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="60"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(categories[department as keyof typeof categories] || categories.marketplace).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Availability</label>
            <div className="space-y-2">
              {Object.entries(formData.availability).map(([day, available]) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={available}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        availability: {
                          ...prev.availability,
                          [day]: !!checked,
                        },
                      }))
                    }
                  />
                  <label htmlFor={day} className="text-sm capitalize">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Service
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoreServiceDialog;
