
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { StallionDetailFilters as FilterType } from "@/types/breeding/stallion-detail";

interface StallionDetailFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  filterOptions: {
    status?: string[];
    quality?: string[];
    technician?: string[];
    [key: string]: string[] | undefined;
  };
}

const StallionDetailFilters = ({ 
  filters, 
  onFiltersChange, 
  filterOptions 
}: StallionDetailFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || "");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleFilterChange = (key: string, value: string) => {
    const currentValues = filters[key] as string[] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({ ...filters, [key]: newValues });
  };

  const removeFilter = (key: string, value: string) => {
    const currentValues = filters[key] as string[] || [];
    const newValues = currentValues.filter(v => v !== value);
    onFiltersChange({ ...filters, [key]: newValues });
  };

  const clearAllFilters = () => {
    onFiltersChange({ searchTerm: "" });
    setSearchTerm("");
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'searchTerm') return value && value.length > 0;
    return Array.isArray(value) && value.length > 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filter
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <label className="text-sm font-medium capitalize mb-2 block">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Select onValueChange={(value) => handleFilterChange(key, value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, values]) => {
            if (key === 'searchTerm' || !Array.isArray(values) || values.length === 0) return null;
            return values.map((value) => (
              <Badge key={`${key}-${value}`} variant="secondary" className="flex items-center gap-1">
                <span className="text-xs">{key}:</span>
                <span>{value}</span>
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter(key, value)}
                />
              </Badge>
            ));
          })}
        </div>
      )}
    </div>
  );
};

export default StallionDetailFilters;
