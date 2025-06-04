
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Beaker } from "lucide-react";
import { Template } from "@/types/template";

interface TemplatePreviewDialogProps {
  template: Template;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TemplatePreviewDialog = ({ template, isOpen, onOpenChange }: TemplatePreviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            {template.nameEn}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Template Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Arabic Name:</span>
                  <span dir="rtl">{template.nameAr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{template.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sample Type:</span>
                  <span>{template.sampleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Methodology:</span>
                  <span>{template.methodology}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Turnaround Time:</span>
                  <span>{template.turnaroundTime}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Parameters ({template.parametersCount})</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {template.parameters.map((param, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{param.nameEn}</div>
                    <div className="text-xs text-muted-foreground" dir="rtl">{param.nameAr}</div>
                    <div className="text-xs">
                      Unit: {param.unit} | Range: {param.normalRangeMin}-{param.normalRangeMax}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewDialog;
