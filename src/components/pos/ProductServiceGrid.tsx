
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, Package, Plus, Wrench } from "lucide-react";
import { StoreProduct, StoreService } from "@/types/store";

interface ProductServiceGridProps {
  products: StoreProduct[];
  services: StoreService[];
  onAddToCart: (item: StoreProduct | StoreService, type: 'product' | 'service') => void;
}

const ProductServiceGrid = ({ products, services, onAddToCart }: ProductServiceGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesType = typeFilter === 'all' || typeFilter === 'products';
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesType = typeFilter === 'all' || typeFilter === 'services';
    return matchesSearch && matchesCategory && matchesType;
  });

  const allCategories = Array.from(new Set([
    ...products.map(p => p.category),
    ...services.map(s => s.category)
  ]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Products & Services
        </CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products and services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {/* Products */}
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{product.name}</h3>
                <Badge variant="outline" className="text-xs">
                  <Package className="h-3 w-3 mr-1" />
                  Product
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product, 'product')}
                  disabled={product.stock === 0}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}

          {/* Services */}
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{service.name}</h3>
                <Badge variant="outline" className="text-xs">
                  <Wrench className="h-3 w-3 mr-1" />
                  Service
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold">${service.price.toFixed(2)}</span>
                {service.duration && (
                  <span className="text-sm text-muted-foreground">
                    {service.duration} min
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs">
                  {service.category}
                </Badge>
                <Button
                  size="sm"
                  onClick={() => onAddToCart(service, 'service')}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && filteredServices.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No products or services found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductServiceGrid;
