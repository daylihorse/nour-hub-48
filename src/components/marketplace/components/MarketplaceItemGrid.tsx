
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Package, Wrench } from "lucide-react";
import { StoreProduct, StoreService } from "@/types/store";

interface MarketplaceItemGridProps {
  items: Array<StoreProduct | StoreService>;
  showAddToCart: boolean;
  onAddToCart?: (item: StoreProduct | StoreService, type: 'product' | 'service') => void;
}

const MarketplaceItemGrid = ({ items, showAddToCart, onAddToCart }: MarketplaceItemGridProps) => {
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

  const handleAddToCart = (item: StoreProduct | StoreService) => {
    console.log('handleAddToCart called for:', item.name);
    if (onAddToCart) {
      const itemIsProduct = isProduct(item);
      console.log('Adding to cart - Type:', itemIsProduct ? 'product' : 'service');
      onAddToCart(item, itemIsProduct ? 'product' : 'service');
    } else {
      console.warn('onAddToCart prop not provided');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
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
  );
};

export default MarketplaceItemGrid;
