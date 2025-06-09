
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, Package, Plus, AlertTriangle } from "lucide-react";

interface PharmacyProductGridProps {
  onAddToCart: (item: any, type: 'product' | 'service') => void;
  saleType: 'prescription' | 'otc' | 'consultation';
}

const PharmacyProductGrid = ({ onAddToCart, saleType }: PharmacyProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock pharmacy products
  const pharmacyProducts = [
    {
      id: "pharm_1",
      name: "Vitamin E & Selenium",
      description: "Essential vitamins for horse health and muscle function",
      price: 35.50,
      category: "Supplements",
      stock: 25,
      requiresPrescription: false,
      controlledSubstance: false,
      dosageForm: "liquid",
    },
    {
      id: "pharm_2",
      name: "Banamine Paste",
      description: "Anti-inflammatory pain reliever for horses",
      price: 45.00,
      category: "Pain Management",
      stock: 15,
      requiresPrescription: true,
      controlledSubstance: false,
      dosageForm: "paste",
    },
    {
      id: "pharm_3",
      name: "Penicillin Injectable",
      description: "Antibiotic for bacterial infections",
      price: 28.75,
      category: "Antibiotics",
      stock: 30,
      requiresPrescription: true,
      controlledSubstance: false,
      dosageForm: "injection",
    },
    {
      id: "pharm_4",
      name: "Tramadol",
      description: "Controlled pain medication",
      price: 65.00,
      category: "Pain Management",
      stock: 8,
      requiresPrescription: true,
      controlledSubstance: true,
      dosageForm: "tablet",
    },
    {
      id: "pharm_5",
      name: "Electrolyte Paste",
      description: "Over-the-counter electrolyte supplement",
      price: 12.50,
      category: "Supplements",
      stock: 50,
      requiresPrescription: false,
      controlledSubstance: false,
      dosageForm: "paste",
    },
  ];

  const filteredProducts = pharmacyProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSaleType = saleType === 'otc' ? !product.requiresPrescription : true;
    
    return matchesSearch && matchesCategory && matchesSaleType;
  });

  const categories = Array.from(new Set(pharmacyProducts.map(p => p.category)));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Pharmacy Products
        </CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex gap-1">
                  {product.requiresPrescription && (
                    <Badge variant="outline" className="text-xs">
                      Rx
                    </Badge>
                  )}
                  {product.controlledSubstance && (
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      CS
                    </Badge>
                  )}
                </div>
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
                  disabled={product.stock === 0 || (saleType === 'otc' && product.requiresPrescription)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PharmacyProductGrid;
