
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddEquipmentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AddEquipmentDialog = ({ isOpen, setIsOpen }: AddEquipmentDialogProps) => {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Equipment</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label>Equipment Name</Label>
          <Input placeholder="Enter equipment name..." />
        </div>
        <div>
          <Label>Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select equipment type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="centrifuge">Centrifuge</SelectItem>
              <SelectItem value="microscope">Microscope</SelectItem>
              <SelectItem value="analyzer">Analyzer</SelectItem>
              <SelectItem value="incubator">Incubator</SelectItem>
              <SelectItem value="spectrophotometer">Spectrophotometer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Manufacturer</Label>
          <Input placeholder="Enter manufacturer..." />
        </div>
        <div>
          <Label>Serial Number</Label>
          <Input placeholder="Enter serial number..." />
        </div>
        <div>
          <Label>Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lab-room-a">Lab Room A</SelectItem>
              <SelectItem value="lab-room-b">Lab Room B</SelectItem>
              <SelectItem value="lab-room-c">Lab Room C</SelectItem>
              <SelectItem value="storage">Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Add Equipment
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddEquipmentDialog;
