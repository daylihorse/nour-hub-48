
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";

interface EditFrozenSemenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: FrozenSemenInventory | null;
  onSave: (record: FrozenSemenInventory) => void;
}

const EditFrozenSemenDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditFrozenSemenDialogProps) => {
  const [formData, setFormData] = useState<Partial<FrozenSemenInventory>>({});

  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleSave = () => {
    if (formData && record) {
      onSave(formData as FrozenSemenInventory);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Frozen Semen Record</DialogTitle>
          <DialogDescription>
            Update the frozen semen inventory details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="freezeDate">Freeze Date</Label>
              <Input
                id="freezeDate"
                type="date"
                value={formData.freezeDate || ""}
                onChange={(e) => handleChange('freezeDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="straws">Straws</Label>
              <Input
                id="straws"
                type="number"
                value={formData.straws || ""}
                onChange={(e) => handleChange('straws', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tank">Tank</Label>
              <Input
                id="tank"
                value={formData.tank || ""}
                onChange={(e) => handleChange('tank', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Quality</Label>
              <Select
                value={formData.quality || ""}
                onValueChange={(value) => handleChange('quality', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade A">Grade A</SelectItem>
                  <SelectItem value="Grade B">Grade B</SelectItem>
                  <SelectItem value="Grade C">Grade C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="viability">Viability</Label>
              <Input
                id="viability"
                value={formData.viability || ""}
                onChange={(e) => handleChange('viability', e.target.value)}
                placeholder="e.g., 95%"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              type="date"
              value={formData.expiry || ""}
              onChange={(e) => handleChange('expiry', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFrozenSemenDialog;
