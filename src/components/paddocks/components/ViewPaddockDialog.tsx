import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Ruler, Users, Droplets, Home, Zap, Calendar, Activity } from "lucide-react";
import { Paddock } from "@/types/paddocks";

interface ViewPaddockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paddock: Paddock;
}

const ViewPaddockDialog = ({ open, onOpenChange, paddock }: ViewPaddockDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'occupied':
        return 'bg-blue-500 text-white';
      case 'maintenance':
        return 'bg-yellow-500 text-white';
      case 'reserved':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pasture':
        return 'text-green-700 bg-green-100';
      case 'exercise':
        return 'text-blue-700 bg-blue-100';
      case 'quarantine':
        return 'text-red-700 bg-red-100';
      case 'breeding':
        return 'text-purple-700 bg-purple-100';
      case 'training':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{paddock.name}</DialogTitle>
              <DialogDescription>
                Paddock #{paddock.number} - Detailed Information
              </DialogDescription>
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
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{paddock.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Number:</span>
                <span className="font-medium">{paddock.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className={getTypeColor(paddock.type)}>
                  {paddock.type}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(paddock.status)}>
                  {paddock.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-medium">{paddock.currentOccupancy}/{paddock.capacity} horses</span>
              </div>
            </CardContent>
          </Card>

          {/* Location & Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Size
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Section:</span>
                <span className="font-medium">{paddock.location.section}</span>
              </div>
              {paddock.location.coordinates && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latitude:</span>
                    <span className="font-medium">{paddock.location.coordinates.lat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longitude:</span>
                    <span className="font-medium">{paddock.location.coordinates.lng}</span>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-medium">
                  {paddock.size.length} × {paddock.size.width} {paddock.size.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Area:</span>
                <span className="font-medium">
                  {paddock.size.area || (paddock.size.length * paddock.size.width)} {paddock.size.unit}²
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Facilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Facilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Water Source:
                </span>
                <Badge variant={paddock.facilities.waterSource ? "default" : "secondary"}>
                  {paddock.facilities.waterSource ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Shelter:
                </span>
                <Badge variant={paddock.facilities.shelter ? "default" : "secondary"}>
                  {paddock.facilities.shelter ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Lighting:
                </span>
                <Badge variant={paddock.facilities.lighting ? "default" : "secondary"}>
                  {paddock.facilities.lighting ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fencing:</span>
                <span className="font-medium capitalize">{paddock.facilities.fencing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gates:</span>
                <span className="font-medium">{paddock.facilities.gates}</span>
              </div>
            </CardContent>
          </Card>

          {/* Soil Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Soil Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Soil Type:</span>
                <span className="font-medium capitalize">{paddock.soilCondition.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Drainage:</span>
                <Badge variant="outline" className={
                  paddock.soilCondition.drainage === 'excellent' ? 'text-green-700 bg-green-100' :
                  paddock.soilCondition.drainage === 'good' ? 'text-blue-700 bg-blue-100' :
                  paddock.soilCondition.drainage === 'fair' ? 'text-yellow-700 bg-yellow-100' :
                  'text-red-700 bg-red-100'
                }>
                  {paddock.soilCondition.drainage}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Tested:</span>
                <span className="font-medium">
                  {new Date(paddock.soilCondition.lastTested).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Horses */}
        {paddock.assignedHorses && paddock.assignedHorses.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assigned Horses ({paddock.assignedHorses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paddock.assignedHorses.map((horse) => (
                  <div key={horse.horseId} className="p-3 border rounded-lg">
                    <div className="font-medium">{horse.horseName}</div>
                    <div className="text-sm text-muted-foreground">
                      Assigned: {new Date(horse.assignedAt).toLocaleDateString()}
                    </div>
                    {horse.expectedDuration && (
                      <div className="text-sm text-muted-foreground">
                        Duration: {horse.expectedDuration} days
                      </div>
                    )}
                    {horse.notes && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Note: {horse.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rotation Schedule */}
        {paddock.rotationSchedule && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rotation Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Rotation:</span>
                <span className="font-medium">
                  {new Date(paddock.rotationSchedule.nextRotation).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rest Period:</span>
                <span className="font-medium">{paddock.rotationSchedule.restPeriod} days</span>
              </div>
              {paddock.rotationSchedule.lastRotation && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Rotation:</span>
                  <span className="font-medium">
                    {new Date(paddock.rotationSchedule.lastRotation).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Maintenance Schedule */}
        {paddock.maintenanceSchedule && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{paddock.maintenanceSchedule.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Maintenance:</span>
                <span className="font-medium">
                  {new Date(paddock.maintenanceSchedule.lastMaintenance).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Maintenance:</span>
                <span className="font-medium">
                  {new Date(paddock.maintenanceSchedule.nextMaintenance).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes */}
        {paddock.notes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{paddock.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Timestamps */}
        <div className="flex justify-between text-sm text-muted-foreground mt-6 pt-4 border-t">
          <span>Created: {new Date(paddock.createdAt).toLocaleString()}</span>
          <span>Updated: {new Date(paddock.updatedAt).toLocaleString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPaddockDialog;