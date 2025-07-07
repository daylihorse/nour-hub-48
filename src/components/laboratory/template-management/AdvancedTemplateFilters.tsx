import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdvancedTemplateFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  sampleTypeFilter: string;
  methodologyFilter: string;
  statusFilter?: string;
  categories: string[];
  sampleTypes: string[];
  methodologies: string[];
  totalResults: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSampleTypeChange: (value: string) => void;
  onMethodologyChange: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onClearFilters: () => void;
}

const AdvancedTemplateFilters = ({
  searchTerm,
  categoryFilter,
  sampleTypeFilter,
  methodologyFilter,
  statusFilter,
  categories,
  sampleTypes,
  methodologies,
  totalResults,
  onSearchChange,
  onCategoryChange,
  onSampleTypeChange,
  onMethodologyChange,
  onStatusChange,
  onClearFilters
}: AdvancedTemplateFiltersProps) => {
  const hasActiveFilters = searchTerm || categoryFilter || sampleTypeFilter || methodologyFilter || statusFilter;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Search & Filters
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {totalResults} templates found
            </Badge>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sample Type Filter */}
          <Select value={sampleTypeFilter} onValueChange={onSampleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Sample Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sample Types</SelectItem>
              {sampleTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Methodology Filter */}
          <Select value={methodologyFilter} onValueChange={onMethodologyChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Methodologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Methodologies</SelectItem>
              {methodologies.map(methodology => (
                <SelectItem key={methodology} value={methodology}>{methodology}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          {onStatusChange && (
            <Select value={statusFilter || ""} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchTerm}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange("")} />
              </Badge>
            )}
            {categoryFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {categoryFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange("")} />
              </Badge>
            )}
            {sampleTypeFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Sample: {sampleTypeFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onSampleTypeChange("")} />
              </Badge>
            )}
            {methodologyFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Method: {methodologyFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onMethodologyChange("")} />
              </Badge>
            )}
            {statusFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Status: {statusFilter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onStatusChange?.("")} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedTemplateFilters;