
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, ExternalLink, CreditCard } from "lucide-react";

interface POSChoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string;
  onUseHere: () => void;
  onOpenSeparate: () => void;
}

const POSChoiceDialog = ({
  isOpen,
  onClose,
  departmentName,
  onUseHere,
  onOpenSeparate
}: POSChoiceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Choose POS Mode
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            How would you like to use the {departmentName} Point of Sale system?
          </p>
          
          <div className="grid gap-3">
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={onUseHere}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Monitor className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Use Here</h3>
                    <p className="text-sm text-muted-foreground">
                      Open POS in current tab
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={onOpenSeparate}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Open in New Tab</h3>
                    <p className="text-sm text-muted-foreground">
                      Dedicated POS window
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default POSChoiceDialog;
