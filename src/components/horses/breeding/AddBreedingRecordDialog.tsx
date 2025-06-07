
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BreedingRecord } from "@/types/breeding";
import EnhancedBreedingRecordForm from "./forms/EnhancedBreedingRecordForm";

interface AddBreedingRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddBreedingRecordDialog = ({ open, onOpenChange }: AddBreedingRecordDialogProps) => {
  const handleSave = (record: Partial<BreedingRecord>) => {
    console.log("Enhanced breeding record data:", record);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <EnhancedBreedingRecordForm
          mode="create"
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddBreedingRecordDialog;
