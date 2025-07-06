import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Paddock, PaddockFilters as PaddockFiltersType } from "@/types/paddocks";

interface PaddockFiltersProps {
  filters: PaddockFiltersType;
  onFiltersChange: (filters: PaddockFiltersType) => void;
  paddocks: Paddock[];
}

const PaddockFilters = ({ filters, onFiltersChange, paddocks }: PaddockFiltersProps) => {
  const uniqueSections = Array.from(new Set(paddocks.map(p => p.location.section)));

  const updateFilter = (key: keyof PaddockFiltersType, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={filters.status || 'all'} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={filters.type || 'all'} onValueChange={(value) => updateFilter('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pasture">Pasture</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
                <SelectItem value="breeding">Breeding</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Availability</label>
            <Select value={filters.availability || 'all'} onValueChange={(value) => updateFilter('availability', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available Only</SelectItem>
                <SelectItem value="occupied">Occupied Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Section</label>
            <Select value={filters.section || 'all'} onValueChange={(value) => updateFilter('section', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Sections" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {uniqueSections.map(section => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.status && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                Status: {filters.status}
                <button onClick={() => updateFilter('status', undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {filters.type && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                Type: {filters.type}
                <button onClick={() => updateFilter('type', undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {filters.availability && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                Availability: {filters.availability}
                <button onClick={() => updateFilter('availability', undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {filters.section && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                Section: {filters.section}
                <button onClick={() => updateFilter('section', undefined)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaddockFilters;