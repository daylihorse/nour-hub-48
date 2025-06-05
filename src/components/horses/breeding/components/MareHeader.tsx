
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MareHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Mare Management</h2>
        <p className="text-muted-foreground">Manage breeding mares and pregnancy tracking</p>
      </div>
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Mare
      </Button>
    </div>
  );
};

export default MareHeader;
