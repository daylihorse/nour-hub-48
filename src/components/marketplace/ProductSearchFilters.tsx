
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Star } from "lucide-react";
import { publicMarketplaceService } from "@/services/publicMarketplaceService";

interface FilterState {
  query: string;
  category: string;
  department: string;
  priceRange: [number, number];
  rating: number;
  featured: boolean;
}

interface ProductSearchFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

const ProductSearchFilters = ({ onFiltersChange, activeFilters }: ProductSearchFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(activeFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = publicMarketplaceService.getCategories();
  const departments = publicMarketplaceService.getDepartments();

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      query: '',
      category: '',
      department: '',
      priceRange: [0, 1000],
      rating: 0,
      featured: false
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.query) count++;
    if (localFilters.category) count++;
    if (localFilters.department) count++;
    if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 1000) count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.featured) count++;
    return count;
  };

  const departmentNames: Record<string, string> = {
    inventory: 'Inventory',
    clinic: 'Veterinary Clinic',
    laboratory: 'Laboratory',
    marketplace: 'Marketplace'
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products and services..."
          value={localFilters.query}
          onChange={(e) => updateFilter('query', e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Switch
            checked={localFilters.featured}
            onCheckedChange={(checked) => updateFilter('featured', checked)}
            id="featured"
          />
          <label htmlFor="featured" className="text-sm">Featured Only</label>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select 
                value={localFilters.category} 
                onValueChange={(value) => updateFilter('category', value === 'all' ? '' : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select 
                value={localFilters.department} 
                onValueChange={(value) => updateFilter('department', value === 'all' ? '' : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {departmentNames[department] || department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              </label>
              <Slider
                value={localFilters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value)}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 cursor-pointer transition-colors ${
                        i < localFilters.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                      onClick={() => updateFilter('rating', i + 1)}
                    />
                  ))}
                </div>
                {localFilters.rating > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateFilter('rating', 0)}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filter Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {localFilters.query && (
            <Badge variant="secondary" className="gap-1">
              Search: {localFilters.query}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('query', '')}
              />
            </Badge>
          )}
          {localFilters.category && (
            <Badge variant="secondary" className="gap-1">
              Category: {localFilters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('category', '')}
              />
            </Badge>
          )}
          {localFilters.department && (
            <Badge variant="secondary" className="gap-1">
              Department: {departmentNames[localFilters.department]}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('department', '')}
              />
            </Badge>
          )}
          {localFilters.featured && (
            <Badge variant="secondary" className="gap-1">
              Featured Only
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilter('featured', false)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearchFilters;
