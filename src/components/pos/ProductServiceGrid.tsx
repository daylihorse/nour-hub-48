
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoreProduct, StoreService } from "@/types/store";

interface ProductServiceGridProps {
  products: StoreProduct[];
  services: StoreService[];
  onAddToCart: (item: StoreProduct | StoreService, type: 'product' | 'service') => void;
}

const ProductServiceGrid = ({ products, services, onAddToCart }: ProductServiceGridProps) => {
  const allItems: (StoreProduct | StoreService)[] = [...products, ...services];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products & Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allItems.map((item) => {
            const isProduct = 'stock' in item;
            
            return (
              <div
                key={item.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => onAddToCart(item, isProduct ? 'product' : 'service')}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <Badge variant={isProduct ? "default" : "secondary"}>
                    {isProduct ? "Product" : "Service"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                  {isProduct && (
                    <span className="text-sm text-muted-foreground">
                      Stock: {(item as StoreProduct).stock}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductServiceGrid;
