
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Settings,
  Layers,
  Grid,
  Ruler,
  Palette
} from "lucide-react";

interface FloorPlanControlsProps {
  buildings: Array<{ id: string; name: string; floors: string[] }>;
  selectedBuilding: string;
  selectedFloor: string;
  onBuildingChange: (building: string) => void;
  onFloorChange: (floor: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
}

interface ViewSettings {
  showGrid: boolean;
  showLabels: boolean;
  showOccupancy: boolean;
  showMaintenance: boolean;
  highlightAvailable: boolean;
  colorScheme: 'default' | 'high-contrast' | 'colorblind';
}

const FloorPlanControls = ({
  buildings,
  selectedBuilding,
  selectedFloor,
  onBuildingChange,
  onFloorChange,
  zoom,
  onZoomChange,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange
}: FloorPlanControlsProps) => {
  const [viewSettings, setViewSettings] = useState<ViewSettings>({
    showGrid: true,
    showLabels: true,
    showOccupancy: true,
    showMaintenance: true,
    highlightAvailable: false,
    colorScheme: 'default'
  });

  const updateViewSetting = <K extends keyof ViewSettings>(
    key: K, 
    value: ViewSettings[K]
  ) => {
    setViewSettings(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    onSearchChange("");
    onStatusFilterChange("all");
    onTypeFilterChange("all");
  };

  const activeFiltersCount = [
    searchTerm && searchTerm.length > 0,
    statusFilter !== "all",
    typeFilter !== "all"
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Location Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="building">Building</Label>
            <Select value={selectedBuilding} onValueChange={onBuildingChange}>
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
            <Label htmlFor="floor">Floor</Label>
            <Select value={selectedFloor} onValueChange={onFloorChange}>
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
        </CardContent>
      </Card>

      {/* Zoom Control */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Zoom</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>25%</span>
              <span className="font-medium">{zoom}%</span>
              <span>400%</span>
            </div>
            <Slider
              value={[zoom]}
              onValueChange={([value]) => onZoomChange(value)}
              min={25}
              max={400}
              step={25}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onZoomChange(50)}
              className="flex-1"
            >
              Fit
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onZoomChange(100)}
              className="flex-1"
            >
              100%
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onZoomChange(200)}
              className="flex-1"
            >
              200%
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Search Rooms</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Room number, name, or occupant..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="status">Status Filter</Label>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger>
                <SelectValue />
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

          <div>
            <Label htmlFor="type">Type Filter</Label>
            <Select value={typeFilter} onValueChange={onTypeFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="stall">Stalls</SelectItem>
                <SelectItem value="paddock">Paddocks</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
                <SelectItem value="warehouse">Warehouses</SelectItem>
                <SelectItem value="office">Offices</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activeFiltersCount > 0 && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* View Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">View Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                <Label htmlFor="grid">Show Grid</Label>
              </div>
              <Switch
                id="grid"
                checked={viewSettings.showGrid}
                onCheckedChange={(checked) => updateViewSetting('showGrid', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <Label htmlFor="labels">Show Labels</Label>
              </div>
              <Switch
                id="labels"
                checked={viewSettings.showLabels}
                onCheckedChange={(checked) => updateViewSetting('showLabels', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <Label htmlFor="occupancy">Show Occupancy</Label>
              </div>
              <Switch
                id="occupancy"
                checked={viewSettings.showOccupancy}
                onCheckedChange={(checked) => updateViewSetting('showOccupancy', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <Label htmlFor="maintenance">Maintenance Alerts</Label>
              </div>
              <Switch
                id="maintenance"
                checked={viewSettings.showMaintenance}
                onCheckedChange={(checked) => updateViewSetting('showMaintenance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <Label htmlFor="highlight">Highlight Available</Label>
              </div>
              <Switch
                id="highlight"
                checked={viewSettings.highlightAvailable}
                onCheckedChange={(checked) => updateViewSetting('highlightAvailable', checked)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="colorScheme">Color Scheme</Label>
            <Select 
              value={viewSettings.colorScheme} 
              onValueChange={(value: ViewSettings['colorScheme']) => 
                updateViewSetting('colorScheme', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="high-contrast">High Contrast</SelectItem>
                <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" variant="outline" className="w-full">
            <Ruler className="h-4 w-4 mr-2" />
            Measure Distance
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Export Floor Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanControls;
