
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BreedingFormData } from "@/types/breeding";

interface AddBreedingRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBreedingRecordDialog = ({ open, onOpenChange }: AddBreedingRecordDialogProps) => {
  const [formData, setFormData] = useState<Partial<BreedingFormData>>({
    method: "natural",
  });
  const [breedingDate, setBreedingDate] = useState<Date>();

  // Mock data for dropdowns
  const stallions = [
    { id: "S001", name: "Thunder" },
    { id: "S002", name: "Lightning" },
    { id: "S003", name: "Storm" },
  ];

  const mares = [
    { id: "M001", name: "Bella" },
    { id: "M002", name: "Luna" },
    { id: "M003", name: "Aurora" },
    { id: "M004", name: "Storm" },
  ];

  const veterinarians = [
    "Dr. Smith",
    "Dr. Johnson",
    "Dr. Brown",
    "Dr. Davis",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Breeding record data:", { ...formData, breedingDate });
    onOpenChange(false);
    // Reset form
    setFormData({ method: "natural" });
    setBreedingDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Breeding Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stallion Selection */}
            <div className="space-y-2">
              <Label htmlFor="stallion">Stallion</Label>
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
                      {mare.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Breeding Date */}
            <div className="space-y-2">
              <Label>Breeding Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !breedingDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {breedingDate ? format(breedingDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={breedingDate}
                    onSelect={setBreedingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Breeding Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Breeding Method</Label>
              <Select 
                value={formData.method || ""} 
                onValueChange={(value) => setFormData({...formData, method: value as any})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="artificial_insemination">Artificial Insemination</SelectItem>
                  <SelectItem value="embryo_transfer">Embryo Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Veterinarian */}
            <div className="space-y-2">
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

            {/* Cost */}
            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                placeholder="Enter cost"
                value={formData.cost || ""}
                onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
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
              Create Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBreedingRecordDialog;
