
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, List, Table2, ChevronDown } from "lucide-react";
import { GridSize } from "../../../components/GridSizeSelector";

interface MareFrozenEmbryoViewSelectorProps {
  viewMode: "grid" | "list" | "table";
  gridSize: GridSize;
  onViewModeChange: (mode: "grid" | "list" | "table") => void;
  onGridSizeChange: (size: GridSize) => void;
}

const MareFrozenEmbryoViewSelector = ({
  viewMode,
  gridSize,
  onViewModeChange,
  onGridSizeChange
}: MareFrozenEmbryoViewSelectorProps) => {
  return (
    <div className="flex gap-1 border rounded-md p-1">
      {/* Columns dropdown - only visible when grid view is active */}
      {viewMode === "grid" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              <LayoutGrid className="h-4 w-4" />
              <span>Columns: {gridSize}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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

      {/* Grid view button */}
      <Button
        variant={viewMode === "grid" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="gap-1"
      >
        <LayoutGrid className="h-4 w-4" />
        <span>Grid</span>
      </Button>

      {/* List view button */}
      <Button
        variant={viewMode === "list" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className="gap-1"
      >
        <List className="h-4 w-4" />
        <span>List</span>
      </Button>

      {/* Table view button */}
      <Button
        variant={viewMode === "table" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("table")}
        className="gap-1"
      >
        <Table2 className="h-4 w-4" />
        <span>Table</span>
      </Button>
    </div>
  );
};

export default MareFrozenEmbryoViewSelector;
