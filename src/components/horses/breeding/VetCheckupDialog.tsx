
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VetCheckupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pregnancyId: string | null;
}

const VetCheckupDialog = ({ open, onOpenChange, pregnancyId }: VetCheckupDialogProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    veterinarian: '',
    type: '',
    findings: '',
    recommendations: ''
  });

  const handleSubmit = () => {
    console.log('Vet checkup scheduled:', formData, 'Pregnancy ID:', pregnancyId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {pregnancyId ? 'Schedule Pregnancy Checkup' : 'Schedule Veterinary Checkup'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="date">Checkup Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="veterinarian">Veterinarian</Label>
            <Input
              id="veterinarian"
              placeholder="Dr. Smith"
              value={formData.veterinarian}
              onChange={(e) => setFormData(prev => ({ ...prev, veterinarian: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="type">Checkup Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select checkup type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine Checkup</SelectItem>
                <SelectItem value="pregnancy">Pregnancy Exam</SelectItem>
                <SelectItem value="ultrasound">Ultrasound</SelectItem>
                <SelectItem value="breeding">Breeding Exam</SelectItem>
                <SelectItem value="health">Health Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="findings">Expected Findings/Notes</Label>
            <Textarea
              id="findings"
              placeholder="Any specific areas of concern or routine checks..."
              value={formData.findings}
              onChange={(e) => setFormData(prev => ({ ...prev, findings: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Schedule Checkup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VetCheckupDialog;
