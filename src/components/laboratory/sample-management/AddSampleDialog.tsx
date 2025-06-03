
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddSampleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AddSampleDialog = ({ isOpen, setIsOpen }: AddSampleDialogProps) => {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Sample</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label>Horse</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select horse..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thunder">Thunder</SelectItem>
              <SelectItem value="bella">Bella</SelectItem>
              <SelectItem value="shadow">Shadow</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Sample Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select sample type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blood">Blood</SelectItem>
              <SelectItem value="urine">Urine</SelectItem>
              <SelectItem value="fecal">Fecal</SelectItem>
              <SelectItem value="tissue">Tissue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Priority</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select priority..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="routine">Routine</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea placeholder="Additional notes..." />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Save Sample
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddSampleDialog;
