import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Settings, Edit, Trash2, Eye } from "lucide-react";
import { Paddock } from "@/types/paddocks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaddockGridViewProps {
  paddocks: Paddock[];
  onEdit: (id: string, data: Partial<Paddock>) => void;
  onDelete: (id: string) => void;
}

const PaddockGridView = ({ paddocks, onEdit, onDelete }: PaddockGridViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "reserved": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grazing": return "🌱";
      case "exercise": return "🏃";
      case "turnout": return "🔄";
      case "breeding": return "💝";
      case "quarantine": return "🏥";
      case "rehabilitation": return "🔧";
      default: return "📍";
    }
  };

  const getOccupancyPercentage = (paddock: Paddock) => {
    return paddock.capacity > 0 ? (paddock.currentOccupancy / paddock.capacity) * 100 : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {paddocks.map((paddock) => (
        <Card key={paddock.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>{getTypeIcon(paddock.type)}</span>
                  {paddock.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">#{paddock.number}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(paddock.status)}>
                  {paddock.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onDelete(paddock.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{paddock.location.section}</span>
            </div>

            {/* Size */}
            <div className="text-sm">
              <span className="text-muted-foreground">Size: </span>
              <span>{paddock.size.length} x {paddock.size.width} {paddock.size.unit}</span>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Occupancy</span>
                </div>
                <span>{paddock.currentOccupancy}/{paddock.capacity}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    getOccupancyPercentage(paddock) >= 90 ? 'bg-red-500' :
                    getOccupancyPercentage(paddock) >= 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${getOccupancyPercentage(paddock)}%` }}
                />
              </div>
            </div>

            {/* Assigned Horses */}
            {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Assigned Horses:</p>
                <div className="flex flex-wrap gap-1">
                  {paddock.assignedHorses.slice(0, 3).map((horse) => (
                    <Badge key={horse.horseId} variant="outline" className="text-xs">
                      {horse.horseName}
                    </Badge>
                  ))}
                  {paddock.assignedHorses.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{paddock.assignedHorses.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {paddock.features && paddock.features.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {paddock.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {paddock.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{paddock.features.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Maintenance Status */}
            {paddock.maintenanceHistory?.nextScheduledMaintenance && (
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Maintenance: {new Date(paddock.maintenanceHistory.nextScheduledMaintenance).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {paddock.status === "available" && (
                <Button size="sm" className="flex-1">
                  Assign Horses
                </Button>
              )}
              {paddock.status === "occupied" && (
                <Button variant="outline" size="sm" className="flex-1">
                  Manage Assignment
                </Button>
              )}
              {paddock.status === "maintenance" && (
                <Button variant="outline" size="sm" className="flex-1">
                  View Maintenance
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaddockGridView;