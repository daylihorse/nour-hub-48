
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordType, RecordStatus, RecordPriority } from "@/types/breeding/unified-records";
import { Calendar, User, MapPin, DollarSign, Clock } from "lucide-react";

interface BaseRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  
  // Record context
  horseId?: string | null;
  horseName?: string;
  pregnancyId?: string | null;
  
  // Form actions
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  isSubmitDisabled?: boolean;
  
  // Additional info
  showHorseInfo?: boolean;
  showPregnancyInfo?: boolean;
}

const BaseRecordDialog = ({
  open,
  onOpenChange,
  title,
  icon,
  children,
  horseId,
  horseName,
  pregnancyId,
  onSubmit,
  onCancel,
  submitLabel = "Save Record",
  isSubmitDisabled = false,
  showHorseInfo = true,
  showPregnancyInfo = false,
}: BaseRecordDialogProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Context Information */}
          {(showHorseInfo && horseId) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Horse Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Horse: {horseName || `ID: ${horseId}`}
                </p>
              </CardContent>
            </Card>
          )}

          {(showPregnancyInfo && pregnancyId) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pregnancy Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pregnancy ID: {pregnancyId}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Form Content */}
          {children}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitDisabled}
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BaseRecordDialog;
