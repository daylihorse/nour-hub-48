
import { useState } from 'react';
import { StallionDetailFilters as FilterType } from '@/types/breeding/stallion-detail';
import FilterPopover from './FilterPopover';
import FilterHeader from './FilterHeader';
import FilterTriggerButton from './FilterTriggerButton';
import SearchInput from './SearchInput';
import DateRangeFilter from './DateRangeFilter';
import DropdownFilter from './DropdownFilter';

interface StallionDetailFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  filterOptions: {
    status?: string[];
    quality?: string[];
    technician?: string[];
    method?: string[];
  };
}

const StallionDetailFilters = ({ filters, onFiltersChange, filterOptions }: StallionDetailFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterType];
    return value && (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        searchTerm={filters.searchTerm || ''}
        onSearchChange={(value) => updateFilter('searchTerm', value)}
      />

      <FilterPopover
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={<FilterTriggerButton hasActiveFilters={hasActiveFilters} />}
      >
        <div className="space-y-4">
          <FilterHeader
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          <DateRangeFilter
            dateRange={filters.dateRange}
            onDateRangeChange={(dateRange) => updateFilter('dateRange', dateRange)}
          />

          {filterOptions.status && (
            <DropdownFilter
              label="Status"
              placeholder="Select status"
              value={filters.status?.[0] || ''}
              options={filterOptions.status}
              onValueChange={(value) => updateFilter('status', value ? [value] : [])}
              allOptionsLabel="All Statuses"
            />
          )}

          {filterOptions.quality && (
            <DropdownFilter
              label="Quality"
              placeholder="Select quality"
              value={filters.quality?.[0] || ''}
              options={filterOptions.quality}
              onValueChange={(value) => updateFilter('quality', value ? [value] : [])}
              allOptionsLabel="All Qualities"
            />
          )}

          {filterOptions.technician && (
            <DropdownFilter
              label="Technician"
              placeholder="Select technician"
              value={filters.technician?.[0] || ''}
              options={filterOptions.technician}
              onValueChange={(value) => updateFilter('technician', value ? [value] : [])}
              allOptionsLabel="All Technicians"
            />
          )}

          {filterOptions.method && (
            <DropdownFilter
              label="Method"
              placeholder="Select method"
              value={filters.method?.[0] || ''}
              options={filterOptions.method}
              onValueChange={(value) => updateFilter('method', value ? [value] : [])}
              allOptionsLabel="All Methods"
            />
          )}
        </div>
      </FilterPopover>
    </div>
  );
};

export default StallionDetailFilters;
