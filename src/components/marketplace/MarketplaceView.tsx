
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Star, Store } from "lucide-react";

// Mock marketplace data
const marketplaceItems = [
  {
    id: "1",
    name: "Chia Seeds",
    price: 25.99,
    category: "Feed Materials",
    storeName: "Al-Russaifi Stores",
    rating: 4.8,
    image: "🌱",
    description: "High-quality organic chia seeds for horse nutrition",
    inStock: true,
  },
  {
    id: "2",
    name: "Wound Stitching Service",
    price: 150.00,
    category: "Veterinary Services",
    storeName: "Arabian Horse Clinic",
    rating: 4.9,
    image: "🏥",
    description: "Professional wound stitching service by certified veterinarians",
    inStock: true,
  },
  {
    id: "3",
    name: "Orniboral",
    price: 45.00,
    category: "Medical Supplies",
    storeName: "Arabian Horse Pharmacy",
    rating: 4.7,
    image: "💊",
    description: "Veterinary medicine for respiratory health",
    inStock: true,
  },
];

const MarketplaceView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.storeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
            <SelectItem value="Feed Materials">Feed Materials</SelectItem>
            <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
            <SelectItem value="Veterinary Services">Veterinary Services</SelectItem>
            <SelectItem value="Training Equipment">Training Equipment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="text-4xl mb-2">{item.image}</div>
                <Badge variant={item.inStock ? "default" : "secondary"}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>{item.storeName}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${item.price}</span>
                <Button size="sm" disabled={!item.inStock}>
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
