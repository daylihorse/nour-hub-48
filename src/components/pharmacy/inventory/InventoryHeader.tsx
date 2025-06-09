
import { Button } from "@/components/ui/button";
import { Plus, Truck } from "lucide-react";

const InventoryHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Pharmacy Inventory</h2>
        <p className="text-muted-foreground">Manage pharmaceutical stock and supplies</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Truck className="h-4 w-4 mr-2" />
          Receive Stock
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default InventoryHeader;
