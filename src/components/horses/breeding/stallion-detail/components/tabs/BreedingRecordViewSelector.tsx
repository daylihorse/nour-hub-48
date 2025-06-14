
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Table as TableIcon } from "lucide-react";

export type ViewMode = "grid" | "list" | "table";

interface BreedingRecordViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const BreedingRecordViewSelector = ({ currentView, onViewChange }: BreedingRecordViewSelectorProps) => {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button
        variant={currentView === "grid" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-none"
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      
      <Button
        variant={currentView === "list" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-none"
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
      
      <Button
        variant={currentView === "table" ? "secondary" : "ghost"}
        size="sm"
        className="rounded-none"
        onClick={() => onViewChange("table")}
      >
        <TableIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default BreedingRecordViewSelector;
