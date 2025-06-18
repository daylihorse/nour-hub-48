import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Edit2, Trash2, Users, Calendar, Eye } from "lucide-react";
import { GridSize } from "./PaddockViewSelector";

interface Paddock {
  id: string;
  name: string;
  number: string;
  status: string;
  type: string;
  location: { section: string };
  currentOccupancy: number;
  capacity: number;
  size: { length: number; width: number; unit: string };
  assignedHorses?: { horseId: string; horseName: string }[];
  rotationSchedule?: { nextRotation: Date };
}

interface PaddockGridViewProps {
  paddocks: Paddock[];
  onViewDetails: (paddock: Paddock) => void;
  onEditPaddock: (paddock: Paddock) => void;
  onDeletePaddock: (paddock: Paddock) => void;
  onAssignHorse?: (paddock: Paddock) => void;
  gridSize?: GridSize;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
}

const PaddockGridView = ({
  paddocks,
  onViewDetails,
  onEditPaddock,
  onDeletePaddock,
  onAssignHorse,
  gridSize = 3,
  getStatusColor,
  getTypeColor,
}: PaddockGridViewProps) => {
  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-6`}>
      {paddocks.map((paddock) => (
        <Card key={paddock.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{paddock.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{paddock.number}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewDetails(paddock)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPaddock(paddock)}
                  title="Edit Paddock"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeletePaddock(paddock)}
                  title="Delete Paddock"
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
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onViewDetails(paddock)}
              >
                View Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => onAssignHorse?.(paddock)}
              >
                Assign Horses
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaddockGridView; 