
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddNewDropdownButtonProps {
  type: "classification" | "supplier" | "unit" | "category";
}

const AddNewDropdownButton = ({ type }: AddNewDropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  const getTitle = () => {
    switch (type) {
      case "classification": return "Add New Classification";
      case "supplier": return "Add New Supplier";
      case "unit": return "Add New Measurement Unit";
      case "category": return "Add New Category";
      default: return "Add New Item";
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "classification": return "Enter classification name";
      case "supplier": return "Enter supplier name";
      case "unit": return "Enter unit name (e.g., Ounce (oz))";
      case "category": return "Enter category name";
      default: return "Enter name";
    }
  };

  const handleSave = () => {
    if (!newValue.trim()) return;
    
    toast({
      title: `New ${type} Added`,
      description: `"${newValue}" has been added to the ${type} list.`,
    });
    
    setNewValue("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newValue">Name</Label>
            <Input
              id="newValue"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={getPlaceholder()}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDropdownButton;
