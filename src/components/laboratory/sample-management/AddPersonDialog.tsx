
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddPersonDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onPersonAdded: (person: { name: string; phone: string }) => void;
}

const AddPersonDialog = ({ isOpen, setIsOpen, onPersonAdded }: AddPersonDialogProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onPersonAdded({ name: name.trim(), phone: phone.trim() });
      setName("");
      setPhone("");
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setPhone("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Person</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              placeholder="Enter person's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              Save Person
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPersonDialog;
