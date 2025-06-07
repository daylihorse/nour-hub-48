
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const LaboratoryDocumentHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Laboratory Documents</h2>
        <p className="text-muted-foreground">Manage lab protocols, reports, and documentation</p>
      </div>
      <Button className="flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
    </div>
  );
};

export default LaboratoryDocumentHeader;
