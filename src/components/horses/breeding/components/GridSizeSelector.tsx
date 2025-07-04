
import { Button } from "@/components/ui/button";
import { Grid3X3, Grid2X2, SquareEqual } from "lucide-react";

export type GridSize = "small" | "medium" | "large";

interface GridSizeSelectorProps {
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  viewMode: string;
}

const GridSizeSelector = ({ gridSize, setGridSize, viewMode }: GridSizeSelectorProps) => {
  if (viewMode !== "grid") return null;

  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button
        variant={gridSize === "small" ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize("small")}
        size="sm"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      
      <Button
        variant={gridSize === "medium" ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize("medium")}
        size="sm"
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant={gridSize === "large" ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize("large")}
        size="sm"
      >
        <SquareEqual className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GridSizeSelector;
