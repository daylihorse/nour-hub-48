
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface AddGeldingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNewGelding: () => void;
  onSelectExistingGelding: (geldingId: string) => void;
}

const AddGeldingDialog = ({ 
  open, 
  onOpenChange, 
  onAddNewGelding, 
  onSelectExistingGelding 
}: AddGeldingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Gelding to Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            Choose how you'd like to add a gelding to the management system:
          </p>
          
          <div className="space-y-3">
            <Button
              onClick={() => {
                onAddNewGelding();
                onOpenChange(false);
              }}
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <Plus className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Register New Gelding</div>
                <div className="text-sm text-gray-500">Add a completely new gelding to the system</div>
              </div>
            </Button>
            
            <Button
              onClick={() => {
                console.log('Select existing gelding');
                onOpenChange(false);
              }}
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <Search className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Add Existing Horse</div>
                <div className="text-sm text-gray-500">Convert an existing horse to gelding management</div>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGeldingDialog;
