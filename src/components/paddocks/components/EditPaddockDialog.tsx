import { useState, useEffect } from "react";
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

interface Paddock {
  id: string;
  name: string;
  number: string;
  type: string;
  status: string;
  location: { section: string };
  capacity: number;
  size: { length: number; width: number; unit: string };
  description?: string;
}

interface EditPaddockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paddock: Paddock | null;
  onSave: (paddock: Paddock) => void;
}

const EditPaddockDialog = ({
  isOpen,
  onClose,
  paddock,
  onSave
}: EditPaddockDialogProps) => {
  const [formData, setFormData] = useState<Partial<Paddock>>({});

  useEffect(() => {
    if (paddock) {
      setFormData(paddock);
    }
  }, [paddock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && paddock) {
      onSave({ ...paddock, ...formData } as Paddock);
    }
  };

  const handleChange = (field: keyof Paddock, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      location: { section: value }
    }));
  };

  const handleSizeChange = (field: 'length' | 'width' | 'unit', value: any) => {
    setFormData(prev => ({
      ...prev,
      size: {
        ...(prev.size || { length: 0, width: 0, unit: 'meters' }),
        [field]: field === 'unit' ? value : (parseFloat(value) || 0)
      }
    }));
  };

  if (!paddock) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Paddock {paddock.number}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Paddock Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="number">Paddock Number</Label>
              <Input
                id="number"
                value={formData.number || ""}
                onChange={(e) => handleChange('number', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type || ""} 
                onValueChange={(value) => handleChange('type', value)}
              >
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
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status || ""} 
                onValueChange={(value) => handleChange('status', value)}
              >
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
            
            <div className="space-y-2">
              <Label htmlFor="location">Location Section</Label>
              <Input
                id="location"
                value={formData.location?.section || ""}
                onChange={(e) => handleLocationChange(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity || ""}
                onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Length"
                type="number"
                min="0"
                step="0.1"
                value={formData.size?.length || ""}
                onChange={(e) => handleSizeChange('length', e.target.value)}
              />
              <Input
                placeholder="Width"
                type="number"
                min="0"
                step="0.1"
                value={formData.size?.width || ""}
                onChange={(e) => handleSizeChange('width', e.target.value)}
              />
              <Select 
                value={formData.size?.unit || "meters"} 
                onValueChange={(value) => handleSizeChange('unit', value)}
              >
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
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaddockDialog; 