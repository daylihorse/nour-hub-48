
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const ClinicDocumentHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold">Document Management</h2>
        <p className="text-muted-foreground">Manage clinic documents and protocols</p>
      </div>
      <Button className="flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
    </div>
  );
};

export default ClinicDocumentHeader;
