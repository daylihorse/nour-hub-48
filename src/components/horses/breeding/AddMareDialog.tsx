
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

const AddMareDialog = ({ open, onOpenChange, onAddNewMare, onSelectExistingMare }: AddMareDialogProps) => {
  const [selectedOption, setSelectedOption] = useState<'select' | 'new' | null>(null);

  // Mock existing mares that are not yet in breeding management
  const availableMares = [
    { id: "M005", name: "Starlight", breed: "Arabian", age: 4 },
    { id: "M006", name: "Moonbeam", breed: "Thoroughbred", age: 6 },
    { id: "M007", name: "Sunshine", breed: "Warmblood", age: 5 },
  ];

  const handleSelectExisting = (mareId: string) => {
    onSelectExistingMare(mareId);
    onOpenChange(false);
    setSelectedOption(null);
  };

  const handleAddNew = () => {
    onAddNewMare();
    onOpenChange(false);
    setSelectedOption(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedOption(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Mare to Breeding Program</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!selectedOption && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                onClick={() => setSelectedOption('select')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Select Existing Mare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from mares already registered in the system
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200"
                onClick={() => setSelectedOption('new')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Register New Mare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Register a new mare and add to breeding program
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedOption === 'select' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Available Mares</h3>
                <Button variant="outline" onClick={() => setSelectedOption(null)}>
                  Back
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {availableMares.map((mare) => (
                  <Card key={mare.id} className="cursor-pointer hover:bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{mare.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {mare.breed} • {mare.age} years • ID: {mare.id}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleSelectExisting(mare.id)}
                        >
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {selectedOption === 'new' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Register New Mare</h3>
                <Button variant="outline" onClick={() => setSelectedOption(null)}>
                  Back
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    This will start the horse registration process. After completing the registration, 
                    the mare will be automatically added to the breeding program.
                  </p>
                  <Button onClick={handleAddNew} className="w-full">
                    Start Horse Registration
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMareDialog;
