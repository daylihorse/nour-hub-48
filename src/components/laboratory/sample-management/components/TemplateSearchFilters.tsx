
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface TemplateSearchFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  sampleTypeFilter: string;
  methodologyFilter: string;
  categories: string[];
  sampleTypes: string[];
  methodologies: string[];
  onSearchTermChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onSampleTypeFilterChange: (value: string) => void;
  onMethodologyFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const TemplateSearchFilters = ({
  searchTerm,
  categoryFilter,
  sampleTypeFilter,
  methodologyFilter,
  categories,
  sampleTypes,
  methodologies,
  onSearchTermChange,
  onCategoryFilterChange,
  onSampleTypeFilterChange,
  onMethodologyFilterChange,
  onClearFilters
}: TemplateSearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = searchTerm || categoryFilter || sampleTypeFilter || methodologyFilter;

  return (
    <div className="mb-4 space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-primary/10" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sampleTypeFilter} onValueChange={onSampleTypeFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by sample type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sample Types</SelectItem>
              {sampleTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={methodologyFilter} onValueChange={onMethodologyFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by methodology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Methodologies</SelectItem>
              {methodologies.map(methodology => (
                <SelectItem key={methodology} value={methodology}>{methodology}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TemplateSearchFilters;
