
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ClientFile } from "@/types/client";

interface FilesListProps {
  files: ClientFile[];
}

const FilesList = ({ files }: FilesListProps) => {
  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-muted/20">
        <div className="flex justify-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="mt-2 text-muted-foreground">No files uploaded yet</p>
        <Button variant="outline" className="mt-3">
          <Upload className="h-4 w-4 mr-1" /> Upload Files
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {files.map((file) => (
        <div 
          key={file.id}
          className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-3">
              <File className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {format(new Date(file.uploadDate), 'MMM dd, yyyy')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilesList;
