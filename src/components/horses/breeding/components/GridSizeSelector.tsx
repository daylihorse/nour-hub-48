
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type GridSize = 2 | 3 | 4;

interface GridSizeSelectorProps {
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  viewMode: string;
}

const GridSizeSelector = ({ gridSize, setGridSize, viewMode }: GridSizeSelectorProps) => {
  // Only show the grid size selector when in grid view
  if (viewMode !== "grid") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <LayoutGrid className="h-4 w-4 mr-1" />
          <span>Columns: {gridSize}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={gridSize === 2 ? "bg-muted" : ""} 
          onClick={() => setGridSize(2)}
        >
          2 Columns
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={gridSize === 3 ? "bg-muted" : ""} 
          onClick={() => setGridSize(3)}
        >
          3 Columns
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={gridSize === 4 ? "bg-muted" : ""} 
          onClick={() => setGridSize(4)}
        >
          4 Columns
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GridSizeSelector;
