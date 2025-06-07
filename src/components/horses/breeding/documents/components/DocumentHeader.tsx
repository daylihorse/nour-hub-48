
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FolderOpen } from "lucide-react";

const DocumentHeader = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>Document Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Store and organize breeding-related documents
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DocumentHeader;
