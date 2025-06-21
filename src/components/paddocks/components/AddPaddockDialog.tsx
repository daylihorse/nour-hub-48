import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AddPaddockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPaddock: (paddockData: any) => void;
}

const AddPaddockDialog = ({ isOpen, onClose, onAddPaddock }: AddPaddockDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    type: "",
    status: "available",
    location: {
      section: "",
      coordinates: { x: 0, y: 0 },
    },
    capacity: 0,
    size: {
      length: 0,
      width: 0,
      unit: "meters",
    },
    description: "",
    features: [],
    amenities: [],
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleSizeChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      size: {
        ...prev.size,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.number || !formData.type || !formData.location.section) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create paddock data
    const paddockData = {
      ...formData,
      currentOccupancy: 0,
      assignedHorses: [],
      maintenanceSchedule: null,
      rotationSchedule: null,
    };

    onAddPaddock(paddockData);
    
    // Reset form
    setFormData({
      name: "",
      number: "",
      type: "",
      status: "available",
      location: {
        section: "",
        coordinates: { x: 0, y: 0 },
      },
      capacity: 0,
      size: {
        length: 0,
        width: 0,
        unit: "meters",
      },
      description: "",
      features: [],
      amenities: [],
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Paddock</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Paddock Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., North Pasture"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="number">Paddock Number *</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                placeholder="e.g., NP-001"
                required
              />
            </div>
          </div>

          {/* Type and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Paddock Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grazing">Grazing</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="turnout">Turnout</SelectItem>
                  <SelectItem value="breeding">Breeding</SelectItem>
                  <SelectItem value="quarantine">Quarantine</SelectItem>
                  <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="section">Location Section *</Label>
              <Input
                id="section"
                value={formData.location.section}
                onChange={(e) => handleLocationChange("section", e.target.value)}
                placeholder="e.g., North Section"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Horse Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", parseInt(e.target.value) || 0)}
                placeholder="Maximum number of horses"
              />
            </div>
          </div>

          {/* Size */}
          <div>
            <Label>Paddock Size</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <Input
                  type="number"
                  min="0"
                  value={formData.size.length}
                  onChange={(e) => handleSizeChange("length", parseInt(e.target.value) || 0)}
                  placeholder="Length"
                />
              </div>
              <div>
                <Input
                  type="number"
                  min="0"
                  value={formData.size.width}
                  onChange={(e) => handleSizeChange("width", parseInt(e.target.value) || 0)}
                  placeholder="Width"
                />
              </div>
              <div>
                <Select value={formData.size.unit} onValueChange={(value) => handleSizeChange("unit", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="acres">Acres</SelectItem>
                    <SelectItem value="hectares">Hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Additional details about the paddock..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Paddock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaddockDialog; 