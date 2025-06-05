
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { storeService } from "@/services/storeService";
import { StoreProduct } from "@/types/store";
import AddStoreProductDialog from "./AddStoreProductDialog";

interface StoreProductManagementProps {
  department: string;
}

const StoreProductManagement = ({ department }: StoreProductManagementProps) => {
  const [products, setProducts] = useState<StoreProduct[]>(storeService.getProducts(department));
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleToggleActive = (productId: string, isActive: boolean) => {
    const updatedProduct = storeService.updateProduct(productId, { isActive });
    if (updatedProduct) {
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
    }
  };

  const handleProductAdded = (product: StoreProduct) => {
    setProducts(prev => [...prev, product]);
    setShowAddDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Product Management</h3>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <Switch
                  checked={product.isActive}
                  onCheckedChange={(checked) => handleToggleActive(product.id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Price:</span>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stock:</span>
                  <span className={product.stock < 10 ? "text-red-600" : ""}>{product.stock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {products.length === 0 && (
          <div className="col-span-full text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No products added yet. Click "Add Product" to get started.</p>
          </div>
        )}
      </div>

      <AddStoreProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        department={department}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default StoreProductManagement;
