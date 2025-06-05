
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Store, Package, Wrench } from "lucide-react";
import { marketplaceService } from "@/services/marketplaceService";
import { StoreProduct, StoreService } from "@/types/store";

interface MarketplaceViewProps {
  onAddToCart?: (item: StoreProduct | StoreService, type: 'product' | 'service') => void;
  showAddToCart?: boolean;
}

const MarketplaceView = ({ onAddToCart, showAddToCart = false }: MarketplaceViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredItems = marketplaceService.filterItems(searchTerm, categoryFilter);
  const availableCategories = marketplaceService.getAvailableCategories();

  const handleAddToCart = (item: StoreProduct | StoreService) => {
    if (onAddToCart) {
      const isProduct = 'stock' in item;
      onAddToCart(item, isProduct ? 'product' : 'service');
    }
  };

  const isProduct = (item: StoreProduct | StoreService): item is StoreProduct => {
    return 'stock' in item;
  };

  const getDepartmentName = (department: string): string => {
    const departmentNames: Record<string, string> = {
      inventory: 'Inventory Department',
      clinic: 'Clinic Department', 
      laboratory: 'Laboratory Department',
      marketplace: 'Marketplace'
    };
    return departmentNames[department] || department;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products and services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const itemIsProduct = isProduct(item);
          const inStock = itemIsProduct ? item.stock > 0 : true;
          
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {itemIsProduct ? (
                      <Package className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Wrench className="h-6 w-6 text-purple-600" />
                    )}
                    <Badge variant={inStock ? "default" : "secondary"}>
                      {inStock ? "Available" : "Out of Stock"}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {itemIsProduct ? "Product" : "Service"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  <span>{getDepartmentName(item.department)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{item.category}</Badge>
                  {itemIsProduct && (
                    <span className="text-sm text-muted-foreground">
                      Stock: {item.stock}
                    </span>
                  )}
                  {!itemIsProduct && item.duration && (
                    <span className="text-sm text-muted-foreground">
                      {item.duration} min
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
                  {showAddToCart && (
                    <Button 
                      size="sm" 
                      disabled={!inStock}
                      onClick={() => handleAddToCart(item)}
                    >
                      {inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;
