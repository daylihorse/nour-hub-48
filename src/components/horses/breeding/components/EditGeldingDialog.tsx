
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Horse } from "@/types/horse";

interface EditGeldingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gelding: Horse | null;
  onSave: (gelding: Horse) => void;
}

const EditGeldingDialog = ({ isOpen, onClose, gelding, onSave }: EditGeldingDialogProps) => {
  const [formData, setFormData] = useState<Partial<Horse>>({});

  useEffect(() => {
    if (gelding) {
      setFormData(gelding);
    }
  }, [gelding]);

  const handleSave = () => {
    if (gelding && formData) {
      onSave({ ...gelding, ...formData });
    }
  };

  if (!gelding) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Gelding - {gelding.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="arabicName">Arabic Name</Label>
            <Input
              id="arabicName"
              value={formData.arabicName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, arabicName: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input
              id="breed"
              value={formData.breed || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={formData.color || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              id="ownerName"
              value={formData.owner_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, owner_name: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ownerContact">Owner Contact</Label>
            <Input
              id="ownerContact"
              value={formData.owner_contact || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, owner_contact: e.target.value }))}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGeldingDialog;
