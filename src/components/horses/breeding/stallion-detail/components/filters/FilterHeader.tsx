
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterHeaderProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const FilterHeader = ({ hasActiveFilters, onClearFilters }: FilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="font-medium">Filters</h4>
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterHeader;
