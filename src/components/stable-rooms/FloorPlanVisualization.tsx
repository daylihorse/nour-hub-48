
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Filter,
  Building,
  MapPin,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FloorPlanVisualization = () => {
  const [selectedBuilding, setSelectedBuilding] = useState("building-a");
  const [selectedFloor, setSelectedFloor] = useState("ground");
  const [zoom, setZoom] = useState(100);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Mock floor plan data
  const buildings = [
    { id: "building-a", name: "Building A - Main Stable", floors: ["ground", "loft"] },
    { id: "building-b", name: "Building B - Paddock Complex", floors: ["ground"] },
    { id: "warehouse", name: "Warehouse Complex", floors: ["ground", "mezzanine"] }
  ];

  const rooms = [
    { id: "A-01", name: "Premium Stall Alpha", x: 10, y: 10, width: 60, height: 40, status: "occupied", type: "stall" },
    { id: "A-02", name: "Standard Stall", x: 80, y: 10, width: 60, height: 40, status: "available", type: "stall" },
    { id: "A-03", name: "Recovery Stall", x: 150, y: 10, width: 60, height: 40, status: "maintenance", type: "stall" },
    { id: "A-04", name: "Quarantine Box", x: 220, y: 10, width: 60, height: 40, status: "available", type: "quarantine" },
    { id: "A-05", name: "Breeding Stall", x: 10, y: 60, width: 60, height: 40, status: "occupied", type: "breeding" },
    { id: "A-06", name: "Foaling Box", x: 80, y: 60, width: 80, height: 60, status: "occupied", type: "foaling" },
    { id: "A-07", name: "Large Paddock", x: 170, y: 60, width: 110, height: 60, status: "available", type: "paddock" },
    { id: "W-01", name: "Feed Storage", x: 10, y: 130, width: 100, height: 80, status: "occupied", type: "warehouse" },
    { id: "W-02", name: "Equipment Store", x: 120, y: 130, width: 80, height: 50, status: "available", type: "equipment" },
    { id: "OFF-01", name: "Office", x: 210, y: 130, width: 70, height: 50, status: "occupied", type: "office" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'occupied': return '#3b82f6';
      case 'maintenance': return '#f59e0b';
      case 'reserved': return '#8b5cf6';
      case 'out_of_order': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stall': return '#e5e7eb';
      case 'paddock': return '#d1fae5';
      case 'warehouse': return '#fef3c7';
      case 'foaling': return '#fce7f3';
      case 'quarantine': return '#fee2e2';
      case 'office': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  };

  const handleRoomClick = (roomId: string) => {
    setSelectedRoom(roomId === selectedRoom ? null : roomId);
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Floor Plan Visualization</h2>
          <p className="text-muted-foreground">Interactive facility layout and room management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Building</label>
                <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building.id} value={building.id}>
                        {building.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Floor</label>
                <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.find(b => b.id === selectedBuilding)?.floors.map((floor) => (
                      <SelectItem key={floor} value={floor}>
                        {floor.charAt(0).toUpperCase() + floor.slice(1)} Floor
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Zoom: {zoom}%</label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="25"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Room Status Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('available') }} />
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('occupied') }} />
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('maintenance') }} />
                <span className="text-sm">Maintenance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('reserved') }} />
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('out_of_order') }} />
                <span className="text-sm">Out of Order</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Room Info */}
          {selectedRoomData && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Room Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{selectedRoomData.id}</p>
                  <p className="text-sm text-muted-foreground">{selectedRoomData.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedRoomData.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getStatusColor(selectedRoomData.status) }}
                    />
                    <span className="text-sm capitalize">{selectedRoomData.status}</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p>Dimensions: {selectedRoomData.width}m × {selectedRoomData.height}m</p>
                  <p>Area: {(selectedRoomData.width * selectedRoomData.height / 100).toFixed(1)} sq.m</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Assign
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Floor Plan Canvas */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {buildings.find(b => b.id === selectedBuilding)?.name} - {selectedFloor.charAt(0).toUpperCase() + selectedFloor.slice(1)} Floor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative overflow-auto" style={{ height: '600px' }}>
                <svg
                  width={`${300 * (zoom / 100)}px`}
                  height={`${220 * (zoom / 100)}px`}
                  viewBox="0 0 300 220"
                  className="border bg-gray-50"
                >
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Rooms */}
                  {rooms.map((room) => (
                    <g key={room.id}>
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        fill={getTypeColor(room.type)}
                        stroke={selectedRoom === room.id ? '#000' : getStatusColor(room.status)}
                        strokeWidth={selectedRoom === room.id ? '2' : '1'}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleRoomClick(room.id)}
                      />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 - 5}
                        textAnchor="middle"
                        className="text-xs font-medium pointer-events-none"
                        fill="#374151"
                      >
                        {room.id}
                      </text>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 + 8}
                        textAnchor="middle"
                        className="text-xs pointer-events-none"
                        fill="#6b7280"
                      >
                        {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                      </text>
                    </g>
                  ))}

                  {/* Walls and structure indicators */}
                  <rect x="0" y="0" width="300" height="220" fill="none" stroke="#374151" strokeWidth="2" />
                  
                  {/* Entrance/Exit markers */}
                  <rect x="140" y="0" width="20" height="3" fill="#10b981" />
                  <text x="150" y="15" textAnchor="middle" className="text-xs" fill="#10b981">Entrance</text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter(r => r.status === 'available').length}
            </div>
            <p className="text-sm text-muted-foreground">Available Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {rooms.filter(r => r.status === 'occupied').length}
            </div>
            <p className="text-sm text-muted-foreground">Occupied Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {rooms.filter(r => r.status === 'maintenance').length}
            </div>
            <p className="text-sm text-muted-foreground">Under Maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {Math.round((rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100)}%
            </div>
            <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FloorPlanVisualization;
