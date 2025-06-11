
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mare } from "@/types/breeding/mare";

interface EditMareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mare: Mare | null;
  onSave: (mare: Mare) => void;
}

const EditMareDialog = ({ isOpen, onClose, mare, onSave }: EditMareDialogProps) => {
  const [formData, setFormData] = useState<Partial<Mare>>({});

  useEffect(() => {
    if (mare) {
      setFormData(mare);
    }
  }, [mare]);

  const handleSubmit = () => {
    if (formData && mare) {
      onSave({ ...mare, ...formData } as Mare);
    }
  };

  const handleChange = (field: keyof Mare, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!mare) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Mare - {mare.horseName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="horseName">Mare Name</Label>
            <Input
              id="horseName"
              value={formData.horseName || ''}
              onChange={(e) => handleChange('horseName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="horseId">Horse ID</Label>
            <Input
              id="horseId"
              value={formData.horseId || ''}
              onChange={(e) => handleChange('horseId', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="breed">Breed</Label>
            <Input
              id="breed"
              value={formData.breed || ''}
              onChange={(e) => handleChange('breed', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="bred">Bred</SelectItem>
                <SelectItem value="pregnant">Pregnant</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMareDialog;
