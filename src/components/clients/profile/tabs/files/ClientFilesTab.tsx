
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientFile } from "@/types/client";
import FilesList from "./FilesList";

interface ClientFilesTabProps {
  files: ClientFile[];
}

const ClientFilesTab = ({ files }: ClientFilesTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Files & Documents</h3>
        <Button>
          <Upload className="h-4 w-4 mr-1" /> Upload File
        </Button>
      </div>
      
      <FilesList files={files} />
    </>
  );
};

export default ClientFilesTab;
