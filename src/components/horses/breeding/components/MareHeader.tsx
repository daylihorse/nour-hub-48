
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MareHeaderProps {
  viewSelector?: ReactNode;
  onAddMare?: () => void;
}

const MareHeader = ({ viewSelector, onAddMare }: MareHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Mare Management</h2>
        <p className="text-muted-foreground">Manage breeding mares and their breeding cycles</p>
      </div>
      <div className="flex items-center gap-4">
        {viewSelector}
        <Button className="flex items-center gap-2" onClick={onAddMare}>
          <Plus className="h-4 w-4" />
          Add Mare
        </Button>
      </div>
    </div>
  );
};

export default MareHeader;
