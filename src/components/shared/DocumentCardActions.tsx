
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentCardActionsProps {
  documentId: string;
  documentName: string;
}

const DocumentCardActions = ({ documentId, documentName }: DocumentCardActionsProps) => {
  const { toast } = useToast();

  const handleView = () => {
    toast({
      title: "View Document",
      description: `Opening ${documentName}`,
    });
    console.log(`Viewing document: ${documentId}`);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${documentName}`,
    });
    console.log(`Downloading document: ${documentId}`);
  };

  const handleDelete = () => {
    toast({
      title: "Delete Document",
      description: `${documentName} has been deleted`,
      variant: "destructive",
    });
    console.log(`Deleting document: ${documentId}`);
  };

  return (
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
        onClick={handleDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default DocumentCardActions;
