
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterTriggerButtonProps {
  hasActiveFilters: boolean;
}

const FilterTriggerButton = ({ hasActiveFilters }: FilterTriggerButtonProps) => {
  return (
    <Button variant="outline" size="sm" className="relative">
      <Filter className="h-4 w-4 mr-2" />
      Filter
      {hasActiveFilters && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
      )}
    </Button>
  );
};

export default FilterTriggerButton;
