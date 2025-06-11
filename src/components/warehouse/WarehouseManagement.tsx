
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Warehouse, Package, BarChart3 } from "lucide-react";

interface WarehouseSpace {
  id: string;
  name: string;
  number: string;
  type: 'warehouse' | 'storage_room' | 'cold_storage' | 'loading_dock';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  capacity: number;
  currentOccupancy: number;
  size: {
    length: number;
    width: number;
    height: number;
    unit: 'm' | 'ft';
  };
  location: {
    building: string;
    section: string;
    zone?: string;
  };
  features: string[];
  amenities: string[];
  storedItems?: {
    itemId: string;
    itemName: string;
    quantity: number;
    category: string;
  }[];
  temperatureControlled?: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  lastInventoryCheck?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mockWarehouses: WarehouseSpace[] = [
  {
    id: "1",
    name: "Main Feed Storage",
    number: "WH-01",
    type: "warehouse",
    status: "occupied",
    capacity: 1000,
    currentOccupancy: 750,
    size: { length: 20, width: 15, height: 6, unit: "m" },
    location: { building: "Warehouse Complex", section: "North", zone: "A" },
    features: ["Climate controlled", "Pest control", "Loading dock", "Forklift access"],
    amenities: ["Security cameras", "Fire suppression", "Inventory system"],
    storedItems: [
      { itemId: "1", itemName: "Horse Feed - Premium", quantity: 500, category: "Feed" },
      { itemId: "2", itemName: "Hay Bales", quantity: 200, category: "Feed" },
      { itemId: "3", itemName: "Bedding - Straw", quantity: 50, category: "Bedding" }
    ],
    temperatureControlled: true,
    securityLevel: "high",
    lastInventoryCheck: new Date("2024-01-20"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "2",
    name: "Equipment Storage",
    number: "WH-02",
    type: "warehouse",
    status: "occupied",
    capacity: 500,
    currentOccupancy: 300,
    size: { length: 15, width: 10, height: 5, unit: "m" },
    location: { building: "Warehouse Complex", section: "South", zone: "B" },
    features: ["Secure access", "Tool racks", "Parts organization"],
    amenities: ["Workshop area", "Maintenance tools"],
    storedItems: [
      { itemId: "4", itemName: "Grooming Equipment", quantity: 25, category: "Equipment" },
      { itemId: "5", itemName: "Maintenance Tools", quantity: 100, category: "Tools" }
    ],
    temperatureControlled: false,
    securityLevel: "medium",
    lastInventoryCheck: new Date("2024-01-18"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-18")
  }
];

const WarehouseManagement = () => {
  const [warehouses] = useState<WarehouseSpace[]>(mockWarehouses);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-green-500 text-white';
      case 'available': return 'bg-blue-500 text-white';
      case 'maintenance': return 'bg-orange-500 text-white';
      case 'reserved': return 'bg-purple-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUtilizationPercentage = (warehouse: WarehouseSpace) => {
    return warehouse.capacity > 0 ? (warehouse.currentOccupancy / warehouse.capacity) * 100 : 0;
  };

  const filteredWarehouses = warehouses.filter(warehouse => {
    const matchesSearch = warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warehouse.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || warehouse.status === statusFilter;
    const matchesType = typeFilter === "all" || warehouse.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Warehouse Management</h2>
          <p className="text-muted-foreground">Manage storage spaces and inventory locations</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Warehouse Space
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Warehouses</p>
                <div className="text-2xl font-bold">{warehouses.length}</div>
              </div>
              <Warehouse className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                <div className="text-2xl font-bold">
                  {warehouses.reduce((sum, w) => sum + w.capacity, 0)}
                </div>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Occupancy</p>
                <div className="text-2xl font-bold">
                  {warehouses.reduce((sum, w) => sum + w.currentOccupancy, 0)}
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Utilization</p>
                <div className="text-2xl font-bold">
                  {Math.round(warehouses.reduce((sum, w) => sum + getUtilizationPercentage(w), 0) / warehouses.length)}%
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search warehouses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="storage_room">Storage Room</SelectItem>
                <SelectItem value="cold_storage">Cold Storage</SelectItem>
                <SelectItem value="loading_dock">Loading Dock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWarehouses.map((warehouse) => (
          <Card key={warehouse.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{warehouse.number}</p>
                </div>
                <Badge className={getStatusColor(warehouse.status)}>
                  {warehouse.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{warehouse.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{warehouse.location.building} - {warehouse.location.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Utilization:</span>
                  <span>{warehouse.currentOccupancy}/{warehouse.capacity} ({Math.round(getUtilizationPercentage(warehouse))}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security:</span>
                  <span className="capitalize">{warehouse.securityLevel}</span>
                </div>
              </div>

              {/* Stored Items */}
              {warehouse.storedItems && warehouse.storedItems.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Stored Items:</p>
                  <div className="space-y-1">
                    {warehouse.storedItems.slice(0, 3).map((item) => (
                      <div key={item.itemId} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{item.itemName}</span>
                        <span>{item.quantity}</span>
                      </div>
                    ))}
                    {warehouse.storedItems.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{warehouse.storedItems.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage Items
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WarehouseManagement;
