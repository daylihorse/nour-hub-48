
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DocumentCardActions from "@/components/shared/DocumentCardActions";
import { Document, getTypeColor, getTypeIcon } from "../types/documentTypes";

interface DocumentGridProps {
  documents: Document[];
}

const DocumentGrid = ({ documents }: DocumentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="text-2xl">{getTypeIcon(doc.type)}</div>
                <Badge className={getTypeColor(doc.type)}>
                  {doc.type}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-sm leading-tight mb-1">
                  {doc.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {doc.size} • {doc.uploadDate.toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {doc.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {doc.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{doc.tags.length - 2} more
                  </Badge>
                )}
              </div>

              <DocumentCardActions documentId={doc.id} documentName={doc.name} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentGrid;
