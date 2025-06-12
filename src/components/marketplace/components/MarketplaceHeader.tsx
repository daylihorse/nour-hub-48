
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface MarketplaceHeaderProps {
  searchTerm: string;
  categoryFilter: string;
  availableCategories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const MarketplaceHeader = ({
  searchTerm,
  categoryFilter,
  availableCategories,
  onSearchChange,
  onCategoryChange
}: MarketplaceHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products and services..."
          value={searchTerm}
          onChange={(e) => {
            console.log('Search term changed:', e.target.value);
            onSearchChange(e.target.value);
          }}
          className="pl-10"
        />
      </div>
      <Select value={categoryFilter} onValueChange={(value) => {
        console.log('Category filter changed:', value);
        onCategoryChange(value);
      }}>
        <SelectTrigger className="w-full md:w-[200px]">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {availableCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MarketplaceHeader;
