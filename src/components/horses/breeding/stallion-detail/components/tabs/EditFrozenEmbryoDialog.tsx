
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
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";

interface EditFrozenEmbryoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  record: FrozenEmbryoInventory | null;
  onSave: (record: FrozenEmbryoInventory) => void;
}

const EditFrozenEmbryoDialog = ({
  isOpen,
  onClose,
  record,
  onSave
}: EditFrozenEmbryoDialogProps) => {
  const [formData, setFormData] = useState<Partial<FrozenEmbryoInventory>>({});

  useEffect(() => {
    if (record) {
      setFormData(record);
    }
  }, [record]);

  const handleSave = () => {
    if (formData && record) {
      onSave(formData as FrozenEmbryoInventory);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Frozen Embryo Record</DialogTitle>
          <DialogDescription>
            Update the frozen embryo inventory details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="creationDate">Creation Date</Label>
              <Input
                id="creationDate"
                type="date"
                value={formData.creationDate || ""}
                onChange={(e) => handleChange('creationDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mareName">Mare Name</Label>
              <Input
                id="mareName"
                value={formData.mareName || ""}
                onChange={(e) => handleChange('mareName', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select
                value={formData.grade || ""}
                onValueChange={(value) => handleChange('grade', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1">Grade 1</SelectItem>
                  <SelectItem value="Grade 2">Grade 2</SelectItem>
                  <SelectItem value="Grade 3">Grade 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select
                value={formData.stage || ""}
                onValueChange={(value) => handleChange('stage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blastocyst">Blastocyst</SelectItem>
                  <SelectItem value="Expanded Blastocyst">Expanded Blastocyst</SelectItem>
                  <SelectItem value="Hatched Blastocyst">Hatched Blastocyst</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="viability">Viability</Label>
              <Input
                id="viability"
                value={formData.viability || ""}
                onChange={(e) => handleChange('viability', e.target.value)}
                placeholder="e.g., 95%"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diameter">Diameter</Label>
              <Input
                id="diameter"
                value={formData.diameter || ""}
                onChange={(e) => handleChange('diameter', e.target.value)}
                placeholder="e.g., 180μm"
              />
            </div>
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

export default EditFrozenEmbryoDialog;
