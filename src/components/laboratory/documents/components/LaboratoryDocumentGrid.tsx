
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import DocumentCardActions from "@/components/shared/DocumentCardActions";
import { LaboratoryDocument, getStatusColor } from "../types/documentTypes";

interface LaboratoryDocumentGridProps {
  documents: LaboratoryDocument[];
}

const LaboratoryDocumentGrid = ({ documents }: LaboratoryDocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <FileText className="h-8 w-8 text-green-600" />
              <Badge variant={getStatusColor(doc.status) as "default" | "secondary"}>
                {doc.status}
              </Badge>
            </div>
            <CardTitle className="text-lg">{doc.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{doc.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="capitalize">{doc.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{doc.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Uploaded:</span>
                <span>{doc.uploadDate}</span>
              </div>
            </div>
            <DocumentCardActions documentId={doc.id} documentName={doc.name} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LaboratoryDocumentGrid;
