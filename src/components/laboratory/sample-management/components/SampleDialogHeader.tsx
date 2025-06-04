
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const SampleDialogHeader = () => {
  return (
    <DialogHeader>
      <DialogTitle>Add New Sample</DialogTitle>
      <DialogDescription>
        Fill in the sample information including horse details, analysis requirements, and sample classification.
      </DialogDescription>
    </DialogHeader>
  );
};

export default SampleDialogHeader;
