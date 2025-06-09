
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  AlertTriangle,
  Calendar,
  DollarSign
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PharmacyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - in real implementation, this would come from API
  const inventoryItems = [
    {
      id: "1",
      name: "Penicillin Injectable",
      genericName: "Penicillin G",
      category: "antibiotic",
      dosageForm: "injection",
      strength: "300,000 IU/ml",
      currentStock: 5,
      minimumStock: 20,
      expiryDate: "2024-06-15",
      batchNumber: "BT001",
      unitCost: 15.50,
      sellingPrice: 23.25,
      requiresPrescription: true,
      status: "low_stock"
    },
    {
      id: "2", 
      name: "Banamine Paste",
      genericName: "Flunixin Meglumine",
      category: "anti_inflammatory",
      dosageForm: "paste",
      strength: "1.5mg/ml",
      currentStock: 8,
      minimumStock: 25,
      expiryDate: "2024-12-30",
      batchNumber: "BT002",
      unitCost: 8.75,
      sellingPrice: 13.50,
      requiresPrescription: true,
      status: "low_stock"
    },
    {
      id: "3",
      name: "Vitamin E & Selenium",
      genericName: "Tocopherol/Selenium",
      category: "vitamin",
      dosageForm: "injection",
      strength: "50mg/1mg per ml",
      currentStock: 45,
      minimumStock: 20,
      expiryDate: "2025-03-15",
      batchNumber: "BT003",
      unitCost: 12.00,
      sellingPrice: 18.00,
      requiresPrescription: false,
      status: "in_stock"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'default';
      case 'low_stock': return 'destructive';
      case 'out_of_stock': return 'secondary';
      default: return 'default';
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pharmacy Inventory</h2>
          <p className="text-muted-foreground">Manage pharmaceutical inventory and stock levels</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Medication
        </Button>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.genericName}</p>
                  <Badge variant="outline" className="mt-1">
                    {item.category.replace('_', ' ')}
                  </Badge>
                </div>
                <Badge variant={getStatusColor(item.status)}>
                  {item.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Form:</span>
                  <span className="font-medium">{item.dosageForm}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Strength:</span>
                  <span className="font-medium">{item.strength}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current Stock:</span>
                  <span className={`font-medium ${item.currentStock <= item.minimumStock ? 'text-red-600' : ''}`}>
                    {item.currentStock}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Min Stock:</span>
                  <span className="font-medium">{item.minimumStock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Expires:</span>
                  <span className="font-medium">{item.expiryDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Batch:</span>
                  <span className="font-medium">{item.batchNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Selling Price:</span>
                  <span className="font-medium">${item.sellingPrice}</span>
                </div>
                
                {item.requiresPrescription && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Prescription Required
                  </Badge>
                )}

                {item.currentStock <= item.minimumStock && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700">Low stock alert</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Package className="h-3 w-3 mr-1" />
                    Restock
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Sell
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No medications found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PharmacyInventory;
