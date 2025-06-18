import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2, Trash2, UserPlus } from "lucide-react";

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

interface PaddockTableViewProps {
  paddocks: Paddock[];
  onViewDetails: (paddock: Paddock) => void;
  onEditPaddock: (paddock: Paddock) => void;
  onDeletePaddock: (paddock: Paddock) => void;
  onAssignHorse?: (paddock: Paddock) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
}

const PaddockTableView = ({
  paddocks,
  onViewDetails,
  onEditPaddock,
  onDeletePaddock,
  onAssignHorse,
  getStatusColor,
  getTypeColor,
}: PaddockTableViewProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Assigned Horses</TableHead>
              <TableHead>Next Rotation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paddocks.map((paddock) => (
              <TableRow key={paddock.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{paddock.name}</TableCell>
                <TableCell>{paddock.number}</TableCell>
                <TableCell>{paddock.location.section}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(paddock.type)}>
                    {paddock.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(paddock.status)}>
                    {paddock.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {paddock.currentOccupancy}/{paddock.capacity} horses
                </TableCell>
                <TableCell>
                  {paddock.size.length}×{paddock.size.width} {paddock.size.unit}
                </TableCell>
                <TableCell>
                  {paddock.assignedHorses && paddock.assignedHorses.length > 0 ? (
                    <div className="space-y-1">
                      {paddock.assignedHorses.slice(0, 2).map((horse) => (
                        <div key={horse.horseId} className="text-xs">
                          {horse.horseName}
                        </div>
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
                  {paddock.rotationSchedule ? (
                    <span className="text-sm">
                      {paddock.rotationSchedule.nextRotation.toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Not scheduled</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
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
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {onAssignHorse && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onAssignHorse(paddock)}
                        title="Assign Horse"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaddockTableView; 