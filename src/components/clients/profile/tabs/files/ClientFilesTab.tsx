import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClientFile } from "@/types/client";
import FilesList from "./FilesList";

interface ClientFilesTabProps {
  files: ClientFile[];
  onUploadFile?: () => void;
}

const ClientFilesTab = ({ files, onUploadFile }: ClientFilesTabProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Files & Documents</h3>
        <Button onClick={onUploadFile}>
          <Upload className="h-4 w-4 mr-1" /> Upload File
        </Button>
      </div>
      
      <FilesList files={files} />
    </>
  );
};

export default ClientFilesTab;
