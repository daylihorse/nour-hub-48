
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Table } from "lucide-react";

interface ViewToggleProps {
  currentView: 'grid' | 'list' | 'table';
  onViewChange: (view: 'grid' | 'list' | 'table') => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center gap-1 border rounded-md p-1 bg-white">
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="h-8 w-8 p-0"
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-8 w-8 p-0"
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewToggle;
