
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

interface AddHorseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNew: () => void;
  onSelectExisting: (horseId: string) => void;
}

const AddHorseDialog = ({ open, onOpenChange, onAddNew, onSelectExisting }: AddHorseDialogProps) => {
  const [mode, setMode] = useState<'select' | 'new' | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock existing horses not in pedigree system
  const availableHorses = [
    { id: "H001", name: "Desert Wind", breed: "Arabian", age: 8, gender: "stallion" },
    { id: "H002", name: "Midnight Star", breed: "Thoroughbred", age: 6, gender: "mare" },
    { id: "H003", name: "Golden Thunder", breed: "Arabian", age: 4, gender: "stallion" },
  ];

  const filteredHorses = availableHorses.filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClose = () => {
    setMode(null);
    setSearchTerm("");
    onOpenChange(false);
  };

  const handleSelectHorse = (horseId: string) => {
    onSelectExisting(horseId);
    handleClose();
  };

  const handleAddNew = () => {
    onAddNew();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Horse to Pedigree System</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!mode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                onClick={() => setMode('select')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Select Existing Horse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from horses already in the system
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200"
                onClick={() => setMode('new')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Register New Horse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add a completely new horse to the system
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {mode === 'select' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Available Horses</h3>
                <Button variant="outline" onClick={() => setMode(null)}>
                  Back
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search horses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredHorses.map((horse) => (
                  <Card key={horse.id} className="cursor-pointer hover:bg-slate-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">{horse.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {horse.breed} • {horse.age} years • {horse.gender} • ID: {horse.id}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleSelectHorse(horse.id)}
                        >
                          Add to Pedigree
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {mode === 'new' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Register New Horse</h3>
                <Button variant="outline" onClick={() => setMode(null)}>
                  Back
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    This will start the complete horse registration process. The horse will be 
                    automatically added to the pedigree system after registration.
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

export default AddHorseDialog;
