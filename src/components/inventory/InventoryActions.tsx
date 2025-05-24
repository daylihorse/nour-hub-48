
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Box, Wrench } from "lucide-react";

interface InventoryActionsProps {
  onAddItem: () => void;
  onAddService: () => void;
}

const InventoryActions = ({ onAddItem, onAddService }: InventoryActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Add New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onAddItem}>
          <Box className="mr-2" />
          Add Item
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddService}>
          <Wrench className="mr-2" />
          Add Service
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InventoryActions;
