
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, MapPin, Edit2, Trash2, Users, Calendar } from "lucide-react";
import { usePaddockData } from "@/hooks/usePaddockData";

const PaddockManagement = () => {
  const { paddocks, deletePaddock } = usePaddockData();
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grazing': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-blue-100 text-blue-800';
      case 'turnout': return 'bg-yellow-100 text-yellow-800';
      case 'breeding': return 'bg-pink-100 text-pink-800';
      case 'quarantine': return 'bg-red-100 text-red-800';
      case 'rehabilitation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPaddocks = paddocks.filter(paddock => {
    const matchesSearch = paddock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paddock.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || paddock.status === statusFilter;
    const matchesType = typeFilter === "all" || paddock.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Paddock Management</h2>
          <p className="text-muted-foreground">Manage pastures, exercise areas, and turnout paddocks</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Paddock
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search paddocks..."
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
                <SelectItem value="grazing">Grazing</SelectItem>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="turnout">Turnout</SelectItem>
                <SelectItem value="breeding">Breeding</SelectItem>
                <SelectItem value="quarantine">Quarantine</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Paddocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaddocks.map((paddock) => (
          <Card key={paddock.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{paddock.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{paddock.number}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deletePaddock(paddock.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status and Type */}
              <div className="flex gap-2">
                <Badge className={getStatusColor(paddock.status)}>
                  {paddock.status}
                </Badge>
                <Badge variant="outline" className={getTypeColor(paddock.type)}>
                  {paddock.type}
                </Badge>
              </div>

              {/* Basic Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{paddock.location.section}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{paddock.currentOccupancy}/{paddock.capacity} horses</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>Size: {paddock.size.length}×{paddock.size.width} {paddock.size.unit}</span>
                </div>
              </div>

              {/* Assigned Horses */}
              {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Assigned Horses:</p>
                  <div className="space-y-1">
                    {paddock.assignedHorses.slice(0, 3).map((horse) => (
                      <div key={horse.horseId} className="text-xs text-muted-foreground">
                        {horse.horseName}
                      </div>
                    ))}
                    {paddock.assignedHorses.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{paddock.assignedHorses.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Next Rotation */}
              {paddock.rotationSchedule && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next rotation: {paddock.rotationSchedule.nextRotation.toLocaleDateString()}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Assign Horses
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPaddocks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No paddocks found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaddockManagement;
