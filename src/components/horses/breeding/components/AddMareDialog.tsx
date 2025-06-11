
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";

interface AddMareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNewMare: () => void;
  onSelectExistingMare: (mareId: string) => void;
}

const AddMareDialog = ({ 
  open, 
  onOpenChange, 
  onAddNewMare, 
  onSelectExistingMare 
}: AddMareDialogProps) => {
  const [selectedOption, setSelectedOption] = useState<'new' | 'existing' | null>(null);

  const handleClose = () => {
    setSelectedOption(null);
    onOpenChange(false);
  };

  const handleNewMare = () => {
    onAddNewMare();
    handleClose();
  };

  const handleExistingMare = () => {
    // For now, just call with a mock ID
    onSelectExistingMare('existing-mare-id');
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Mare to Breeding Program</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card 
            className={`cursor-pointer transition-colors ${
              selectedOption === 'new' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedOption('new')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Register New Mare
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create a new horse record and add to breeding program
              </p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-colors ${
              selectedOption === 'existing' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedOption('existing')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Select Existing Horse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Add an existing horse to the breeding program
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={selectedOption === 'new' ? handleNewMare : handleExistingMare}
              disabled={!selectedOption}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMareDialog;
