import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Calendar, Edit2 } from "lucide-react";

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
  description?: string;
  features?: string[];
  amenities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaddockDetailsDialogProps {
  paddock: Paddock | null;
  open: boolean;
  onOpenChange: () => void;
  onEdit: (paddock: Paddock) => void;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
}

const PaddockDetailsDialog = ({
  paddock,
  open,
  onOpenChange,
  onEdit,
  getStatusColor,
  getTypeColor,
}: PaddockDetailsDialogProps) => {
  if (!paddock) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{paddock.name}</DialogTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(paddock)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Paddock Number</p>
                  <p className="text-lg">{paddock.number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{paddock.location.section}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <Badge variant="outline" className={getTypeColor(paddock.type)}>
                    {paddock.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(paddock.status)}>
                    {paddock.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Capacity</p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{paddock.currentOccupancy}/{paddock.capacity} horses</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Size</p>
                  <span>{paddock.size.length}×{paddock.size.width} {paddock.size.unit}</span>
                </div>
              </div>
              
              {paddock.description && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-sm mt-1">{paddock.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Horses */}
          {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assigned Horses ({paddock.assignedHorses.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {paddock.assignedHorses.map((horse) => (
                    <div key={horse.horseId} className="p-3 border rounded-lg">
                      <p className="font-medium">{horse.horseName}</p>
                      <p className="text-sm text-muted-foreground">ID: {horse.horseId}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rotation Schedule */}
          {paddock.rotationSchedule && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rotation Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Next rotation: {paddock.rotationSchedule.nextRotation.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features and Amenities */}
          {((paddock.features && paddock.features.length > 0) || (paddock.amenities && paddock.amenities.length > 0)) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paddock.features && paddock.features.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {paddock.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {paddock.amenities && paddock.amenities.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {paddock.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          {(paddock.createdAt || paddock.updatedAt) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Record Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {paddock.createdAt && (
                    <div>
                      <p className="font-medium text-muted-foreground">Created</p>
                      <p>{paddock.createdAt.toLocaleDateString()} at {paddock.createdAt.toLocaleTimeString()}</p>
                    </div>
                  )}
                  {paddock.updatedAt && (
                    <div>
                      <p className="font-medium text-muted-foreground">Last Updated</p>
                      <p>{paddock.updatedAt.toLocaleDateString()} at {paddock.updatedAt.toLocaleTimeString()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange()}>
              Close
            </Button>
            <Button onClick={() => onEdit(paddock)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Paddock
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaddockDetailsDialog; 