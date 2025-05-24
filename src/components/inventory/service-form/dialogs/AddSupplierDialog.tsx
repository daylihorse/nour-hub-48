
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";

const AddSupplierDialog = () => {
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState("");

  const handleAddSupplier = () => {
    if (newSupplier) {
      // In a real app, save to database
      setSupplierDialogOpen(false);
      setNewSupplier("");
    }
  };

  return (
    <Dialog open={supplierDialogOpen} onOpenChange={setSupplierDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-start text-left font-normal text-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Supplier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Create a new supplier for your services.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <FormLabel>Supplier Name</FormLabel>
            <Input
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
              placeholder="Enter supplier name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setSupplierDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAddSupplier}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;
