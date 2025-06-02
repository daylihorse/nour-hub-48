
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Box, Wrench, Store } from "lucide-react";

interface InventoryActionsProps {
  onAddItem: () => void;
  onAddService: () => void;
  onBrowseMarketplace?: () => void;
}

const InventoryActions = ({ onAddItem, onAddService, onBrowseMarketplace }: InventoryActionsProps) => {
  return (
    <div className="flex gap-2">
      {onBrowseMarketplace && (
        <Button variant="outline" onClick={onBrowseMarketplace}>
          <Store className="mr-2" />
          Browse Marketplace
        </Button>
      )}
      
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
    </div>
  );
};

export default InventoryActions;
