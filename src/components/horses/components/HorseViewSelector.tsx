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

interface HorseViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  gridSize?: GridSize;
  onGridSizeChange?: (size: GridSize) => void;
}

const HorseViewSelector = ({ 
  currentView, 
  onViewChange,
  gridSize = 3,
  onGridSizeChange = () => {},
}: HorseViewSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      {currentView === "grid" && (
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
              onClick={() => onGridSizeChange(2)}
            >
              2 Columns
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={gridSize === 3 ? "bg-muted" : ""} 
              onClick={() => onGridSizeChange(3)}
            >
              3 Columns
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={gridSize === 4 ? "bg-muted" : ""} 
              onClick={() => onGridSizeChange(4)}
            >
              4 Columns
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <div className="flex border rounded-md overflow-hidden">
        <Button
          variant={currentView === "grid" ? "secondary" : "ghost"}
          className={`rounded-none ${currentView === "grid" ? "" : "bg-background"}`}
          onClick={() => onViewChange("grid")}
          size="sm"
        >
          <LayoutGrid className="h-4 w-4 mr-1" />
          Grid
        </Button>
        
        <Button
          variant={currentView === "list" ? "secondary" : "ghost"}
          className={`rounded-none ${currentView === "list" ? "" : "bg-background"}`}
          onClick={() => onViewChange("list")}
          size="sm"
        >
          <List className="h-4 w-4 mr-1" />
          List
        </Button>
        
        <Button
          variant={currentView === "table" ? "secondary" : "ghost"}
          className={`rounded-none ${currentView === "table" ? "" : "bg-background"}`}
          onClick={() => onViewChange("table")}
          size="sm"
        >
          <TableIcon className="h-4 w-4 mr-1" />
          Table
        </Button>
      </div>
    </div>
  );
};

export default HorseViewSelector; 