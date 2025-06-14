
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddStallionDialog from "./AddStallionDialog";

interface StallionHeaderProps {
  viewSelector?: ReactNode;
}

const StallionHeader = ({ viewSelector }: StallionHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Stallion Management</h2>
        <p className="text-muted-foreground">Manage breeding stallions and their performance</p>
      </div>
      <div className="flex items-center gap-4">
        {viewSelector}
        <Button className="flex items-center gap-2" onClick={openDialog}>
          <Plus className="h-4 w-4" />
          Add Stallion
        </Button>
      </div>
      
      <AddStallionDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
      />
    </div>
  );
};

export default StallionHeader;
