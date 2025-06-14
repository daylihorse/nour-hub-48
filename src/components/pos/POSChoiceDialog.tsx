
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ExternalLink, Monitor } from "lucide-react";

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
  onOpenSeparate,
}: POSChoiceDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {departmentName} Point of Sale
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to use the POS system for {departmentName.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={onUseHere}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Monitor className="h-8 w-8 text-blue-500" />
                <div className="flex-1">
                  <h3 className="font-medium">Use Here</h3>
                  <p className="text-sm text-muted-foreground">
                    Open POS in the current tab within the {departmentName} section
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={onOpenSeparate}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-8 w-8 text-green-500" />
                <div className="flex-1">
                  <h3 className="font-medium">Open in New Tab</h3>
                  <p className="text-sm text-muted-foreground">
                    Open POS in a separate page for dedicated use
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default POSChoiceDialog;
