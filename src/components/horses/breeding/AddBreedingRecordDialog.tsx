
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BreedingFormValues } from "./forms/FormSchema";
import BasicInfoFields from "./forms/BasicInfoFields";
import AdditionalInfoFields from "./forms/AdditionalInfoFields";

interface AddBreedingRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBreedingRecordDialog = ({ open, onOpenChange }: AddBreedingRecordDialogProps) => {
  const [formData, setFormData] = useState<Partial<BreedingFormValues>>({
    method: "natural",
  });
  const [breedingDate, setBreedingDate] = useState<Date>();

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
          <BasicInfoFields 
            formData={formData}
            setFormData={setFormData}
            breedingDate={breedingDate}
            setBreedingDate={setBreedingDate}
          />

          <AdditionalInfoFields 
            formData={formData}
            setFormData={setFormData}
          />

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
