import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Mare {
  id: string;
  horseId: string;
  horseName: string;
  status: string;
  age: number;
  breed: string;
  totalFoals: number;
  liveFoals: number;
  lastBreedingDate: string | null;
  expectedDueDate: string | null;
  pregnancyDay: number;
  nextHeat: string | null;
  stallionName: string | null;
  foalBirthDate?: string;
}

interface EditMareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mare: Mare | null;
  onSave: (updatedMare: Mare) => void;
}

const EditMareDialog = ({ isOpen, onClose, mare, onSave }: EditMareDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Mare>>({});

  // Initialize form data when mare changes
  React.useEffect(() => {
    if (mare) {
      setFormData(mare);
    }
  }, [mare]);

  const handleSave = () => {
    if (!mare || !formData.horseName || !formData.breed) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedMare: Mare = {
      ...mare,
      ...formData,
    } as Mare;

    onSave(updatedMare);
    toast({
      title: "Mare Updated",
      description: `${updatedMare.horseName} has been updated successfully`,
    });
    onClose();
  };

  const handleInputChange = (field: keyof Mare, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!mare) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Mare - {mare.horseName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="horseName" className="text-right">
              Name*
            </Label>
            <Input
              id="horseName"
              value={formData.horseName || ''}
              onChange={(e) => handleInputChange('horseName', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breed" className="text-right">
              Breed*
            </Label>
            <Input
              id="breed"
              value={formData.breed || ''}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={formData.status || ''}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger className="col-span-3">
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stallionName" className="text-right">
              Stallion
            </Label>
            <Input
              id="stallionName"
              value={formData.stallionName || ''}
              onChange={(e) => handleInputChange('stallionName', e.target.value)}
              className="col-span-3"
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

export default EditMareDialog;
