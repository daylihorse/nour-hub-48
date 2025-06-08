
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Table } from "lucide-react";

interface MareViewToggleProps {
  currentView: 'grid' | 'list' | 'table';
  onViewChange: (view: 'grid' | 'list' | 'table') => void;
}

const MareViewToggle = ({ currentView, onViewChange }: MareViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 border rounded-md p-1 bg-white">
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="h-12 w-16 p-1 flex flex-col items-center justify-center gap-1"
      >
        <Grid2X2 className="h-4 w-4" />
        <span className="text-xs">Grid</span>
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-12 w-16 p-1 flex flex-col items-center justify-center gap-1"
      >
        <List className="h-4 w-4" />
        <span className="text-xs">List</span>
      </Button>
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-12 w-16 p-1 flex flex-col items-center justify-center gap-1"
      >
        <Table className="h-4 w-4" />
        <span className="text-xs">Table</span>
      </Button>
    </div>
  );
};

export default MareViewToggle;
