
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddTestRequestDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AddTestRequestDialog = ({ isOpen, setIsOpen }: AddTestRequestDialogProps) => {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Create Test Request</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <Label>Sample</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select sample..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s001">S001 - Thunder (Blood)</SelectItem>
              <SelectItem value="s002">S002 - Bella (Urine)</SelectItem>
              <SelectItem value="s003">S003 - Shadow (Fecal)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Test Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select test type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbc">Complete Blood Count</SelectItem>
              <SelectItem value="urinalysis">Urinalysis</SelectItem>
              <SelectItem value="parasite">Parasite Screening</SelectItem>
              <SelectItem value="chemistry">Blood Chemistry</SelectItem>
              <SelectItem value="culture">Culture & Sensitivity</SelectItem>
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
          <Label>Special Instructions</Label>
          <Textarea placeholder="Any special instructions or notes..." />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Create Request
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddTestRequestDialog;
