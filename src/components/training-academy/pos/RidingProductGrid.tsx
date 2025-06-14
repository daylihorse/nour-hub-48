
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, Calendar, Plus, Rabbit, MapPin, Clock } from "lucide-react";
import { marketplaceService } from "@/services/marketplaceService";

interface RidingProductGridProps {
  onAddToCart: (item: any, type: 'product' | 'service') => void;
  showAddToCart: boolean;
}

interface RidingExperience {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  duration: string;
  maxRiders: number;
  difficulty: string;
  isActive: boolean;
  department: "academy";
  routes: string[];
}

const RidingProductGrid = ({ onAddToCart, showAddToCart }: RidingProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Riding experiences data
  const ridingExperiences: RidingExperience[] = [
    {
      id: "ride_1",
      name: "Scenic Trail Ride",
      description: "2-hour guided trail ride through beautiful countryside",
      price: 75.00,
      category: "Trail Rides",
      duration: "2 hours",
      maxRiders: 6,
      difficulty: "Beginner",
      isActive: true,
      department: "academy" as const,
      routes: ["Mountain Vista Trail", "Lakeside Path"],
    },
    {
      id: "ride_2",
      name: "Beach Sunset Ride",
      description: "Magical 1.5-hour sunset ride along pristine beaches",
      price: 95.00,
      category: "Beach Rides",
      duration: "1.5 hours",
      maxRiders: 4,
      difficulty: "Beginner",
      isActive: true,
      department: "academy" as const,
      routes: ["Coastal Path", "Dune Trail"],
    },
    {
      id: "ride_3",
      name: "Mountain Adventure",
      description: "3-hour challenging ride through mountain terrain",
      price: 125.00,
      category: "Adventure Rides",
      duration: "3 hours",
      maxRiders: 4,
      difficulty: "Intermediate",
      isActive: true,
      department: "academy" as const,
      routes: ["Summit Trail", "Ridge Path"],
    },
    {
      id: "ride_4",
      name: "Private Lesson",
      description: "One-on-one riding instruction with certified instructor",
      price: 150.00,
      category: "Lessons",
      duration: "1 hour",
      maxRiders: 1,
      difficulty: "All Levels",
      isActive: true,
      department: "academy" as const,
      routes: ["Training Arena"],
    },
  ];

  // Get marketplace items
  const marketplaceItems = marketplaceService.getAllMarketplaceItems();

  // Combine riding experiences and marketplace items
  const allItems = [
    ...ridingExperiences,
    ...marketplaceItems.filter(item => 
      item.category.toLowerCase().includes('horse') ||
      item.category.toLowerCase().includes('equine') ||
      item.category.toLowerCase().includes('riding') ||
      item.name.toLowerCase().includes('horse') ||
      item.name.toLowerCase().includes('equine')
    ),
  ];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory && item.isActive;
  });

  const categories = Array.from(new Set(allItems.map(item => item.category)));

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'Advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const isRidingExperience = (item: any): item is RidingExperience => {
    return 'duration' in item && 'maxRiders' in item && 'difficulty' in item && 'routes' in item;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Riding Experiences & Equipment
        </CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search experiences and products..."
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex gap-1">
                  {isRidingExperience(item) && (
                    <>
                      {getDifficultyBadge(item.difficulty)}
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.duration}
                      </Badge>
                    </>
                  )}
                  {!isRidingExperience(item) && 'stock' in item && (
                    <Badge variant="outline" className="text-xs">
                      Stock: {item.stock}
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              
              {isRidingExperience(item) && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Rabbit className="h-3 w-3" />
                    <span>Max riders: {item.maxRiders}</span>
                    <MapPin className="h-3 w-3 ml-2" />
                    <span>{item.routes.length} route{item.routes.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
              
              {showAddToCart && (
                <Button
                  size="sm"
                  onClick={() => onAddToCart(item, isRidingExperience(item) ? 'service' : 'product')}
                  className="w-full"
                  disabled={!isRidingExperience(item) && 'stock' in item && item.stock === 0}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No items found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RidingProductGrid;
