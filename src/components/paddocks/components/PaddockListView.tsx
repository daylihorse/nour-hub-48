import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Edit2, Trash2, Users, Calendar, Eye, UserPlus } from "lucide-react";

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

interface PaddockListViewProps {
  paddocks: Paddock[];
  onViewDetails: (paddock: Paddock) => void;
  onEditPaddock: (paddock: Paddock) => void;
  onDeletePaddock: (paddock: Paddock) => void;
  onAssignHorse?: (paddock: Paddock) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
}

const PaddockListView = ({
  paddocks,
  onViewDetails,
  onEditPaddock,
  onDeletePaddock,
  onAssignHorse,
  getStatusColor,
  getTypeColor,
}: PaddockListViewProps) => {
  return (
    <div className="space-y-4">
      {paddocks.map((paddock) => (
        <Card key={paddock.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{paddock.name}</h3>
                    <p className="text-sm text-muted-foreground">{paddock.number}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(paddock.status)}>
                      {paddock.status}
                    </Badge>
                    <Badge variant="outline" className={getTypeColor(paddock.type)}>
                      {paddock.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{paddock.location.section}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{paddock.currentOccupancy}/{paddock.capacity} horses</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Size: {paddock.size.length}×{paddock.size.width} {paddock.size.unit}
                    </span>
                  </div>
                </div>

                {/* Assigned Horses */}
                {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Assigned Horses:</p>
                    <div className="flex flex-wrap gap-1">
                      {paddock.assignedHorses.slice(0, 5).map((horse) => (
                        <Badge key={horse.horseId} variant="secondary" className="text-xs">
                          {horse.horseName}
                        </Badge>
                      ))}
                      {paddock.assignedHorses.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{paddock.assignedHorses.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Next Rotation */}
                {paddock.rotationSchedule && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Next rotation: {paddock.rotationSchedule.nextRotation.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2 ml-6">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewDetails(paddock)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPaddock(paddock)}
                  title="Edit Paddock"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onAssignHorse?.(paddock)}
                  title="Assign Horse"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeletePaddock(paddock)}
                  title="Delete Paddock"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaddockListView; 