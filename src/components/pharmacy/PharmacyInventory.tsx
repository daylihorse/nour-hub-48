
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  Calendar,
  Edit,
  Eye,
  Truck
} from "lucide-react";

const PharmacyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  // Mock inventory data
  const inventoryItems = [
    {
      id: "PI001",
      name: "Penicillin Injectable",
      genericName: "Penicillin G Procaine",
      brandName: "Pen-G",
      category: "antibiotic",
      dosageForm: "injection",
      strength: "300,000",
      unit: "IU/ml",
      currentStock: 15,
      minimumStock: 20,
      maximumStock: 100,
      expiryDate: "2024-12-15",
      batchNumber: "PEN2024001",
      supplier: "VetMed Pharmaceuticals",
      unitCost: 12.50,
      sellingPrice: 18.75,
      location: "Cold Storage A-1",
      requiresPrescription: true,
      controlledSubstance: false,
      storageRequirements: "Refrigerate 2-8°C"
    },
    {
      id: "PI002",
      name: "Banamine Paste",
      genericName: "Flunixin Meglumine",
      brandName: "Banamine",
      category: "anti_inflammatory",
      dosageForm: "liquid",
      strength: "1500",
      unit: "mg/tube",
      currentStock: 25,
      minimumStock: 15,
      maximumStock: 75,
      expiryDate: "2025-06-20",
      batchNumber: "BAN2024005",
      supplier: "Merck Animal Health",
      unitCost: 8.25,
      sellingPrice: 14.50,
      location: "Shelf B-3",
      requiresPrescription: true,
      controlledSubstance: false,
      storageRequirements: "Room temperature"
    },
    {
      id: "PI003",
      name: "Vitamin E & Selenium",
      genericName: "Vitamin E & Selenium",
      brandName: "E-Se",
      category: "vitamin",
      dosageForm: "injection",
      strength: "50",
      unit: "mg/ml",
      currentStock: 8,
      minimumStock: 25,
      maximumStock: 100,
      expiryDate: "2024-09-30",
      batchNumber: "VIT2024012",
      supplier: "Animal Health Solutions",
      unitCost: 15.75,
      sellingPrice: 24.00,
      location: "Refrigerator C-2",
      requiresPrescription: false,
      controlledSubstance: false,
      storageRequirements: "Refrigerate 2-8°C"
    },
    {
      id: "PI004",
      name: "Dexamethasone",
      genericName: "Dexamethasone Sodium Phosphate",
      brandName: "Azium",
      category: "anti_inflammatory",
      dosageForm: "injection",
      strength: "2",
      unit: "mg/ml",
      currentStock: 30,
      minimumStock: 20,
      maximumStock: 80,
      expiryDate: "2025-03-15",
      batchNumber: "DEX2024008",
      supplier: "Zoetis",
      unitCost: 22.50,
      sellingPrice: 35.00,
      location: "Shelf A-5",
      requiresPrescription: true,
      controlledSubstance: false,
      storageRequirements: "Room temperature, protect from light"
    }
  ];

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) return { status: "out_of_stock", color: "bg-red-500", text: "Out of Stock" };
    if (current <= minimum) return { status: "low_stock", color: "bg-orange-500", text: "Low Stock" };
    return { status: "in_stock", color: "bg-green-500", text: "In Stock" };
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 90; // Within 3 months
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brandName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    let matchesStock = true;
    if (stockFilter === 'low_stock') {
      matchesStock = item.currentStock <= item.minimumStock;
    } else if (stockFilter === 'out_of_stock') {
      matchesStock = item.currentStock === 0;
    } else if (stockFilter === 'expiring_soon') {
      matchesStock = isExpiringSoon(item.expiryDate);
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pharmacy Inventory</h2>
          <p className="text-muted-foreground">Manage pharmaceutical stock and supplies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Truck className="h-4 w-4 mr-2" />
            Receive Stock
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
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
                <SelectItem value="antibiotic">Antibiotics</SelectItem>
                <SelectItem value="anti_inflammatory">Anti-inflammatory</SelectItem>
                <SelectItem value="sedative">Sedatives</SelectItem>
                <SelectItem value="vitamin">Vitamins</SelectItem>
                <SelectItem value="vaccine">Vaccines</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.minimumStock);
          const expiringSoon = isExpiringSoon(item.expiryDate);
          
          return (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Generic: {item.genericName}</p>
                      {item.brandName && <p>Brand: {item.brandName}</p>}
                      <p>Strength: {item.strength} {item.unit}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={`${stockStatus.color} text-white`}>
                      {stockStatus.text}
                    </Badge>
                    {expiringSoon && (
                      <Badge variant="outline" className="block text-orange-700 border-orange-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        Expires Soon
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Current Stock</p>
                    <p className="text-xl font-bold">{item.currentStock}</p>
                    <p className="text-xs text-muted-foreground">Min: {item.minimumStock} | Max: {item.maximumStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pricing</p>
                    <p className="text-sm">Cost: ${item.unitCost}</p>
                    <p className="text-sm">Price: ${item.sellingPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expiry Date</p>
                    <p className="text-sm">{item.expiryDate}</p>
                    <p className="text-xs text-muted-foreground">Batch: {item.batchNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">{item.location}</p>
                    <p className="text-xs text-muted-foreground">Supplier: {item.supplier}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    {item.requiresPrescription && (
                      <Badge variant="outline">Prescription Required</Badge>
                    )}
                    {item.controlledSubstance && (
                      <Badge variant="outline" className="text-red-700 border-red-300">
                        Controlled Substance
                      </Badge>
                    )}
                    <Badge variant="outline" className="capitalize">
                      {item.category.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {item.currentStock <= item.minimumStock && (
                      <Button size="sm">
                        <Package className="h-3 w-3 mr-1" />
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>

                {item.storageRequirements && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-md">
                    <p className="text-xs text-blue-700">
                      <strong>Storage:</strong> {item.storageRequirements}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No inventory items found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PharmacyInventory;
