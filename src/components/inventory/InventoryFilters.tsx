
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const InventoryFilters = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default InventoryFilters;
