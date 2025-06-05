
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { PregnancyFormData } from "@/types/breeding";

interface AddPregnancyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPregnancyDialog = ({ open, onOpenChange }: AddPregnancyDialogProps) => {
  const [formData, setFormData] = useState<Partial<PregnancyFormData>>({});
  const [breedingDate, setBreedingDate] = useState<Date>();
  const [expectedDueDate, setExpectedDueDate] = useState<Date>();

  // Mock data for dropdowns
  const mares = [
    { id: "M001", name: "Bella", status: "bred" },
    { id: "M002", name: "Luna", status: "bred" },
    { id: "M003", name: "Aurora", status: "bred" },
  ];

  const stallions = [
    { id: "S001", name: "Thunder" },
    { id: "S002", name: "Lightning" },
    { id: "S003", name: "Storm" },
  ];

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Brown",
    "Dr. Davis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pregnancy data:", { ...formData, breedingDate, expectedDueDate });
    onOpenChange(false);
    // Reset form
    setFormData({});
    setBreedingDate(undefined);
    setExpectedDueDate(undefined);
  };

  const calculateDueDate = (breedingDate: Date) => {
    const dueDate = new Date(breedingDate);
    dueDate.setDate(dueDate.getDate() + 340); // Average horse gestation period
    return dueDate;
  };

  const handleBreedingDateChange = (date: Date | undefined) => {
    setBreedingDate(date);
    if (date) {
      setExpectedDueDate(calculateDueDate(date));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Pregnancy Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mare Selection */}
            <div className="space-y-2">
              <Label htmlFor="mare">Mare</Label>
              <Select 
                value={formData.mareId || ""} 
                onValueChange={(value) => setFormData({...formData, mareId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mare" />
                </SelectTrigger>
                <SelectContent>
                  {mares.map((mare) => (
                    <SelectItem key={mare.id} value={mare.id}>
                      {mare.name} ({mare.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stallion Selection */}
            <div className="space-y-2">
              <Label htmlFor="stallion">Stallion (Optional)</Label>
              <Select 
                value={formData.stallionId || ""} 
                onValueChange={(value) => setFormData({...formData, stallionId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stallion" />
                </SelectTrigger>
                <SelectContent>
                  {stallions.map((stallion) => (
                    <SelectItem key={stallion.id} value={stallion.id}>
                      {stallion.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Breeding Date */}
            <div className="space-y-2">
              <Label>Breeding Date</Label>
              <DatePicker
                date={breedingDate}
                onDateChange={handleBreedingDateChange}
                placeholder="Select breeding date"
              />
            </div>

            {/* Expected Due Date */}
            <div className="space-y-2">
              <Label>Expected Due Date</Label>
              <DatePicker
                date={expectedDueDate}
                onDateChange={setExpectedDueDate}
                placeholder="Select due date"
              />
              {breedingDate && (
                <p className="text-xs text-muted-foreground">
                  Auto-calculated from breeding date (340 days)
                </p>
              )}
            </div>

            {/* Veterinarian */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="veterinarian">Veterinarian</Label>
              <Select 
                value={formData.veterinarian || ""} 
                onValueChange={(value) => setFormData({...formData, veterinarian: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select veterinarian" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarians.map((vet) => (
                    <SelectItem key={vet} value={vet}>
                      {vet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes about the pregnancy..."
              value={formData.notes || ""}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Pregnancy Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPregnancyDialog;
