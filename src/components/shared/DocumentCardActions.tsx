
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ViewDocumentDialog from "./dialogs/ViewDocumentDialog";
import DeleteDocumentDialog from "./dialogs/DeleteDocumentDialog";

interface DocumentCardActionsProps {
  documentId: string;
  documentName: string;
  document?: {
    id: string;
    name: string;
    type: string;
    category: string;
    uploadDate: string;
    size: string;
    status: 'active' | 'archived';
  };
}

const DocumentCardActions = ({ documentId, documentName, document: documentData }: DocumentCardActionsProps) => {
  const { toast } = useToast();
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleView = () => {
    setShowViewDialog(true);
    console.log(`Viewing document: ${documentId}`);
  };

  const handleDownload = () => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // In a real app, this would be the file URL
    link.download = documentName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: `Downloading ${documentName}`,
    });
    console.log(`Downloading document: ${documentId}`);
  };

  const handleDelete = () => {
    toast({
      title: "Document Deleted",
      description: `${documentName} has been deleted`,
      variant: "destructive",
    });
    console.log(`Deleting document: ${documentId}`);
  };

  return (
    <>
      <div className="flex gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 h-8 text-xs"
          onClick={handleView}
        >
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 h-8 text-xs"
          onClick={handleDownload}
        >
          <Download className="h-3 w-3 mr-1" />
          Download
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-8 h-8 p-0"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <ViewDocumentDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        document={documentData || {
          id: documentId,
          name: documentName,
          type: 'Unknown',
          category: 'general',
          uploadDate: new Date().toISOString().split('T')[0],
          size: 'Unknown',
          status: 'active'
        }}
      />

      <DeleteDocumentDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        documentName={documentName}
      />
    </>
  );
};

export default DocumentCardActions;
