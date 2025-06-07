
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DocumentCardActions from "@/components/shared/DocumentCardActions";
import { Document, getTypeIcon } from "../types/documentTypes";

interface DocumentCategoriesProps {
  documents: Document[];
}

const DocumentCategories = ({ documents }: DocumentCategoriesProps) => {
  const categories = [...new Set(documents.map(doc => doc.category))];

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryDocs = documents.filter(doc => doc.category === category);
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {categoryDocs.length} document{categoryDocs.length !== 1 ? 's' : ''}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-lg">{getTypeIcon(doc.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm truncate">{doc.name}</h5>
                      <p className="text-xs text-muted-foreground">{doc.size}</p>
                    </div>
                    <DocumentCardActions documentId={doc.id} documentName={doc.name} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DocumentCategories;
