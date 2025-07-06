import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

interface PaddockTableViewProps {
  paddocks: Paddock[];
  onEdit: (id: string, data: Partial<Paddock>) => void;
  onDelete: (id: string) => void;
}

const PaddockTableView = ({ paddocks, onEdit, onDelete }: PaddockTableViewProps) => {
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
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paddock</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Horses</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Next Maintenance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paddocks.map((paddock) => (
            <TableRow key={paddock.id} className="hover:bg-muted/50">
              <TableCell>
                <div>
                  <div className="font-medium">{paddock.name}</div>
                  <div className="text-sm text-muted-foreground">#{paddock.number}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(paddock.type)}</span>
                  <span className="capitalize">{paddock.type}</span>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{paddock.location.section}</span>
                </div>
              </TableCell>
              
              <TableCell>
                <span>{paddock.size.length} x {paddock.size.width} {paddock.size.unit}</span>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{paddock.currentOccupancy}/{paddock.capacity}</span>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
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
              </TableCell>
              
              <TableCell>
                <Badge className={getStatusColor(paddock.status)}>
                  {paddock.status}
                </Badge>
              </TableCell>
              
              <TableCell>
                {paddock.assignedHorses && paddock.assignedHorses.length > 0 ? (
                  <div className="space-y-1">
                    {paddock.assignedHorses.slice(0, 2).map((horse) => (
                      <Badge key={horse.horseId} variant="outline" className="text-xs mr-1">
                        {horse.horseName}
                      </Badge>
                    ))}
                    {paddock.assignedHorses.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{paddock.assignedHorses.length - 2} more
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
              
              <TableCell>
                {paddock.features && paddock.features.length > 0 ? (
                  <div className="space-y-1">
                    {paddock.features.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs mr-1">
                        {feature}
                      </Badge>
                    ))}
                    {paddock.features.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{paddock.features.length - 2} more
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
              
              <TableCell>
                {paddock.maintenanceHistory?.nextScheduledMaintenance ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(paddock.maintenanceHistory.nextScheduledMaintenance).toLocaleDateString()}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">None scheduled</span>
                )}
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  {paddock.status === "available" && (
                    <Button size="sm" variant="default">
                      Assign
                    </Button>
                  )}
                  {paddock.status === "occupied" && (
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  )}
                  {paddock.status === "maintenance" && (
                    <Button size="sm" variant="outline">
                      Maintenance
                    </Button>
                  )}
                  
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {paddocks.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No paddocks found
        </div>
      )}
    </div>
  );
};

export default PaddockTableView;