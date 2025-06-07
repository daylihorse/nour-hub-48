
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DocumentCardActions from "@/components/shared/DocumentCardActions";
import { Document, getTypeColor, getTypeIcon } from "../types/documentTypes";

interface DocumentListProps {
  documents: Document[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{getTypeIcon(doc.type)}</div>
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge className={`${getTypeColor(doc.type)} text-xs`}>
                        {doc.type}
                      </Badge>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <DocumentCardActions documentId={doc.id} documentName={doc.name} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentList;
