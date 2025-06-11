
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, MapPin, DollarSign, Edit2, Trash2, Clock, AlertTriangle } from "lucide-react";
import { BaseRecord } from "@/types/breeding/unified-records";
import { getRecordStatusColor, getRecordPriorityColor, getRecordTypeLabel, getRecordTypeIcon } from "./utils/recordUtils";

interface RecordDetailViewProps {
  record: BaseRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (record: BaseRecord) => void;
  onDelete?: (recordId: string) => void;
}

const RecordDetailView = ({ 
  record, 
  open, 
  onOpenChange, 
  onEdit, 
  onDelete 
}: RecordDetailViewProps) => {
  if (!record) return null;

  const IconComponent = getRecordTypeIcon(record.type);
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not set';
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isOverdue = record.dueDate && record.dueDate < new Date() && record.status !== 'completed';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="h-5 w-5" />
            {record.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getRecordStatusColor(record.status)}>
              {record.status}
            </Badge>
            <Badge className={getRecordPriorityColor(record.priority)}>
              {record.priority} priority
            </Badge>
            <Badge variant="outline">
              {getRecordTypeLabel(record.type)}
            </Badge>
            {isOverdue && (
              <Badge className="bg-red-500 text-white">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Overdue
              </Badge>
            )}
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Horse</label>
                  <p className="font-medium">{record.horseName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Record ID</label>
                  <p className="font-mono text-sm">{record.id}</p>
                </div>
              </div>
              
              {record.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="mt-1">{record.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Important Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{formatDate(record.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">{formatDate(record.updatedAt)}</span>
                </div>
                {record.scheduledDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scheduled:</span>
                    <span className="font-medium">{formatDate(record.scheduledDate)}</span>
                  </div>
                )}
                {record.completedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">{formatDate(record.completedDate)}</span>
                  </div>
                )}
                {record.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due:</span>
                    <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {formatDate(record.dueDate)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personnel and Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Personnel & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="font-medium">{record.createdBy}</span>
                </div>
                {record.veterinarian && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Veterinarian:</span>
                    <span className="font-medium">{record.veterinarian}</span>
                  </div>
                )}
                {record.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned To:</span>
                    <span className="font-medium">{record.assignedTo}</span>
                  </div>
                )}
                {record.location && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{record.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Costs */}
          {(record.estimatedCost || record.actualCost) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Cost Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {record.estimatedCost && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Cost:</span>
                      <span className="font-medium">${record.estimatedCost.toFixed(2)}</span>
                    </div>
                  )}
                  {record.actualCost && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual Cost:</span>
                      <span className="font-medium">${record.actualCost.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags and Notes */}
          {(record.tags?.length || record.notes) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {record.tags && record.tags.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {record.notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="mt-1 text-sm">{record.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
              {onEdit && (
                <Button onClick={() => onEdit(record)} className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit Record
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              {onDelete && (
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    onDelete(record.id);
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDetailView;
