import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Table as TableIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ViewMode = "grid" | "list" | "table";
export type GridSize = 2 | 3 | 4;

interface PaddockViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  gridSize?: GridSize;
  onGridSizeChange?: (size: GridSize) => void;
}

const PaddockViewSelector = ({ 
  currentView,
  onViewChange,
  gridSize = 3,
  onGridSizeChange,
}: PaddockViewSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* View Mode Buttons */}
      <div className="flex border border-border rounded-md">
        <Button
          variant={currentView === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange("grid")}
          className="rounded-r-none"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={currentView === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange("list")}
          className="rounded-none border-x"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={currentView === "table" ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange("table")}
          className="rounded-l-none"
        >
          <TableIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Grid Size Selector (only visible in grid view) */}
      {currentView === "grid" && onGridSizeChange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {gridSize} Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem onClick={() => onGridSizeChange(2)}>
              2 Columns
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGridSizeChange(3)}>
              3 Columns
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onGridSizeChange(4)}>
              4 Columns
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default PaddockViewSelector;