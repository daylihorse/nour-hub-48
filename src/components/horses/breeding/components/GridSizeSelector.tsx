
import { Button } from "@/components/ui/button";
import { Grid3X3, Grid2X2, SquareEqual } from "lucide-react";

export type GridSize = 2 | 3 | 4;

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
        variant={gridSize === 2 ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize(2)}
        size="sm"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      
      <Button
        variant={gridSize === 3 ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize(3)}
        size="sm"
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      
      <Button
        variant={gridSize === 4 ? "secondary" : "ghost"}
        className="rounded-none"
        onClick={() => setGridSize(4)}
        size="sm"
      >
        <SquareEqual className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GridSizeSelector;
