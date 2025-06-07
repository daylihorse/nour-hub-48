
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, HardDrive, User } from "lucide-react";

interface ViewDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    type: string;
    category: string;
    uploadDate: string;
    size: string;
    status: 'active' | 'archived';
  } | null;
}

const ViewDocumentDialog = ({ isOpen, onClose, document }: ViewDocumentDialogProps) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {document.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge variant={document.status === 'active' ? 'default' : 'secondary'}>
              {document.status}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Document ID: {document.id}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                Document Type
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                {document.type}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Category
              </div>
              <div className="text-sm text-muted-foreground ml-6 capitalize">
                {document.category}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Upload Date
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                {document.uploadDate}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <HardDrive className="h-4 w-4" />
                File Size
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                {document.size}
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="text-sm font-medium mb-2">Document Preview</h4>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Document preview not available</p>
              <p className="text-xs">Use the download option to view the full document</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDocumentDialog;
