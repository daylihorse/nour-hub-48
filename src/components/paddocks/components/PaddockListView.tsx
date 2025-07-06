import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Settings, Edit, Trash2, Eye, ArrowRight } from "lucide-react";
import { Paddock } from "@/types/paddocks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaddockListViewProps {
  paddocks: Paddock[];
  onEdit: (id: string, data: Partial<Paddock>) => void;
  onDelete: (id: string) => void;
}

const PaddockListView = ({ paddocks, onEdit, onDelete }: PaddockListViewProps) => {
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
    <div className="space-y-3">
      {paddocks.map((paddock) => (
        <Card key={paddock.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {/* Left Section - Main Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getTypeIcon(paddock.type)}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{paddock.name}</h3>
                    <p className="text-sm text-muted-foreground">#{paddock.number}</p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-6 ml-6">
                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{paddock.location.section}</span>
                  </div>

                  {/* Size */}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Size: </span>
                    <span>{paddock.size.length} x {paddock.size.width} {paddock.size.unit}</span>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{paddock.currentOccupancy}/{paddock.capacity}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
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
                </div>
              </div>

              {/* Center Section - Status and Features */}
              <div className="hidden lg:flex items-center gap-4">
                <Badge className={getStatusColor(paddock.status)}>
                  {paddock.status}
                </Badge>

                {paddock.features && paddock.features.length > 0 && (
                  <div className="flex gap-1">
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
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2">
                {/* Assigned Horses Info */}
                {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
                  <div className="hidden xl:flex items-center gap-2 mr-4">
                    <span className="text-sm text-muted-foreground">Horses:</span>
                    <div className="flex gap-1">
                      {paddock.assignedHorses.slice(0, 2).map((horse) => (
                        <Badge key={horse.horseId} variant="outline" className="text-xs">
                          {horse.horseName}
                        </Badge>
                      ))}
                      {paddock.assignedHorses.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{paddock.assignedHorses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Status Badge for smaller screens */}
                <div className="lg:hidden">
                  <Badge className={getStatusColor(paddock.status)}>
                    {paddock.status}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {paddock.status === "available" && (
                    <Button size="sm">
                      Assign Horses
                    </Button>
                  )}
                  {paddock.status === "occupied" && (
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  )}
                  {paddock.status === "maintenance" && (
                    <Button variant="outline" size="sm">
                      Maintenance
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>

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
            </div>

            {/* Mobile Info Section */}
            <div className="md:hidden mt-3 pt-2 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{paddock.location.section}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{paddock.currentOccupancy}/{paddock.capacity}</span>
                </div>
              </div>
              
              {paddock.features && paddock.features.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {paddock.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Maintenance Alert */}
            {paddock.maintenanceHistory?.nextScheduledMaintenance && (
              <div className="mt-3 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-yellow-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Maintenance scheduled: {new Date(paddock.maintenanceHistory.nextScheduledMaintenance).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaddockListView;