
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

// Mock data
const storeProducts = [
  {
    id: "1",
    name: "Premium Chia Seeds",
    category: "Feed Materials",
    price: 25.99,
    stock: 50,
    isListedInMarketplace: true,
    image: "🌱",
  },
  {
    id: "2",
    name: "Horse Vitamins",
    category: "Medical Supplies",
    price: 35.50,
    stock: 25,
    isListedInMarketplace: false,
    image: "💊",
  },
];

const StoreProductList = () => {
  const handleToggleMarketplace = (id: string, listed: boolean) => {
    console.log(`Toggle marketplace listing for product ${id}: ${listed}`);
  };

  return (
    <div className="space-y-4">
      {storeProducts.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{product.image}</div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{product.category}</Badge>
                    <span>Stock: {product.stock}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold">${product.price}</div>
                  <div className="flex items-center gap-2 text-sm">
                    {product.isListedInMarketplace ? (
                      <Eye className="h-4 w-4 text-green-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={product.isListedInMarketplace ? "text-green-600" : "text-gray-400"}>
                      {product.isListedInMarketplace ? "Listed" : "Unlisted"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={product.isListedInMarketplace}
                    onCheckedChange={(checked) => handleToggleMarketplace(product.id, checked)}
                  />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {storeProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No products added yet. Click "Add Product" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default StoreProductList;
