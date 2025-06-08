
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  MapPin, 
  Users, 
  Wrench,
  DollarSign,
  Building
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room } from "@/types/stableRooms";

const RoomManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - in real implementation, this would come from a service
  const rooms: Room[] = [
    {
      id: "1",
      number: "A-01",
      name: "Premium Stall Alpha",
      type: "stall",
      status: "occupied",
      capacity: 1,
      currentOccupancy: 1,
      size: { length: 4, width: 4, unit: "m" },
      location: { building: "Building A", section: "North Wing" },
      features: ["Automatic waterer", "Rubber matting", "Hay feeder"],
      amenities: ["Climate control", "CCTV"],
      assignedTo: {
        type: "horse",
        entityId: "h1",
        entityName: "Thunder",
        assignedDate: new Date("2024-01-15")
      },
      pricing: { dailyRate: 50, monthlyRate: 1400, currency: "USD" },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-15")
    },
    {
      id: "2",
      number: "A-02",
      name: "Standard Stall",
      type: "stall",
      status: "available",
      capacity: 1,
      currentOccupancy: 0,
      size: { length: 3.5, width: 3.5, unit: "m" },
      location: { building: "Building A", section: "North Wing" },
      features: ["Manual waterer", "Straw bedding"],
      amenities: [],
      pricing: { dailyRate: 35, monthlyRate: 980, currency: "USD" },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01")
    },
    {
      id: "3",
      number: "W-01",
      name: "Feed Storage Warehouse",
      type: "warehouse",
      status: "occupied",
      capacity: 100,
      currentOccupancy: 75,
      size: { length: 20, width: 15, height: 5, unit: "m" },
      location: { building: "Warehouse Complex", section: "Central" },
      features: ["Climate controlled", "Pest control", "Loading dock"],
      amenities: ["Forklift access", "Inventory system"],
      assignedTo: {
        type: "supplies",
        entityId: "s1",
        entityName: "Horse Feed & Bedding",
        assignedDate: new Date("2024-01-01")
      },
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-05")
    }
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || room.type === filterType;
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-blue-500';
      case 'maintenance': return 'bg-orange-500';
      case 'reserved': return 'bg-purple-500';
      case 'out_of_order': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stall':
      case 'paddock':
        return <Building className="h-4 w-4" />;
      case 'warehouse':
      case 'feed_storage':
        return <Building className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Room Management</h2>
          <p className="text-muted-foreground">Manage stalls, paddocks, and storage facilities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Room
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms by number or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="stall">Stalls</SelectItem>
                <SelectItem value="paddock">Paddocks</SelectItem>
                <SelectItem value="warehouse">Warehouses</SelectItem>
                <SelectItem value="feed_storage">Feed Storage</SelectItem>
                <SelectItem value="equipment">Equipment Storage</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="out_of_order">Out of Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(room.type)}
                  <div>
                    <CardTitle className="text-lg">{room.number}</CardTitle>
                    <p className="text-sm text-muted-foreground">{room.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(room.status)}`} />
                  <Badge variant="outline" className="capitalize">
                    {room.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{room.location.building} - {room.location.section}</span>
              </div>

              {/* Occupancy */}
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{room.currentOccupancy}/{room.capacity}</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(room.currentOccupancy / room.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Size */}
              <div className="text-sm text-muted-foreground">
                Size: {room.size.length} × {room.size.width}{room.size.height ? ` × ${room.size.height}` : ''} {room.size.unit}
              </div>

              {/* Assignment */}
              {room.assignedTo && (
                <div className="p-2 bg-muted/50 rounded text-sm">
                  <p className="font-medium">Assigned to: {room.assignedTo.entityName}</p>
                  <p className="text-muted-foreground">
                    Since: {room.assignedTo.assignedDate.toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Pricing */}
              {room.pricing && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${room.pricing.dailyRate}/day</span>
                  <span className="text-muted-foreground">|</span>
                  <span>${room.pricing.monthlyRate}/month</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Wrench className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground">
              No rooms match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoomManagement;
