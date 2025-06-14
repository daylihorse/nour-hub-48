
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Table as TableIcon } from "lucide-react";
import GridSizeSelector, { GridSize } from "./GridSizeSelector";

export type ViewMode = "grid" | "list" | "table";

interface ViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  gridSize?: GridSize;
  onGridSizeChange?: (size: GridSize) => void;
}

const ViewSelector = ({ 
  currentView, 
  onViewChange, 
  gridSize, 
  onGridSizeChange 
}: ViewSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
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
      
      {gridSize && onGridSizeChange && (
        <GridSizeSelector
          gridSize={gridSize}
          setGridSize={onGridSizeChange}
          viewMode={currentView}
        />
      )}
    </div>
  );
};

export default ViewSelector;
