
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { StallionDetailFilters as FilterType } from '@/types/breeding/stallion-detail';

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
      <div className="flex-1">
        <Input
          placeholder="Search records..."
          value={filters.searchTerm || ''}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => updateFilter('dateRange', {
                    ...filters.dateRange,
                    start: e.target.value
                  })}
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => updateFilter('dateRange', {
                    ...filters.dateRange,
                    end: e.target.value
                  })}
                />
              </div>
            </div>

            {/* Status Filter */}
            {filterOptions.status && (
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status?.[0] || ''}
                  onValueChange={(value) => updateFilter('status', value ? [value] : [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    {filterOptions.status.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quality Filter */}
            {filterOptions.quality && (
              <div className="space-y-2">
                <Label>Quality</Label>
                <Select
                  value={filters.quality?.[0] || ''}
                  onValueChange={(value) => updateFilter('quality', value ? [value] : [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Qualities</SelectItem>
                    {filterOptions.quality.map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Technician Filter */}
            {filterOptions.technician && (
              <div className="space-y-2">
                <Label>Technician</Label>
                <Select
                  value={filters.technician?.[0] || ''}
                  onValueChange={(value) => updateFilter('technician', value ? [value] : [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Technicians</SelectItem>
                    {filterOptions.technician.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Method Filter */}
            {filterOptions.method && (
              <div className="space-y-2">
                <Label>Method</Label>
                <Select
                  value={filters.method?.[0] || ''}
                  onValueChange={(value) => updateFilter('method', value ? [value] : [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Methods</SelectItem>
                    {filterOptions.method.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StallionDetailFilters;
