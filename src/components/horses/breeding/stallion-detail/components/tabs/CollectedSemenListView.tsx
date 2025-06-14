
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TestTube, Edit, Trash2 } from "lucide-react";
import { CollectedSemen } from "@/types/breeding/stallion-detail";

interface CollectedSemenListViewProps {
  collectedSemen: CollectedSemen[];
  onEdit: (record: CollectedSemen) => void;
  onDelete: (record: CollectedSemen) => void;
  getStatusColor: (status: string) => "default" | "secondary" | "outline" | "destructive";
}

const CollectedSemenListView = ({
  collectedSemen,
  onEdit,
  onDelete,
  getStatusColor
}: CollectedSemenListViewProps) => {
  return (
    <div className="space-y-3">
      {collectedSemen.map((collection) => (
        <Card key={collection.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{collection.id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{collection.collectionDate}</span>
                </div>
                <span className="text-sm text-muted-foreground">{collection.technician}</span>
                <div className="flex gap-4 text-sm">
                  <span>Vol: {collection.volume}</span>
                  <span>Conc: {collection.concentration}</span>
                  <span>Mot: {collection.motility}</span>
                  <span>Qual: {collection.quality}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(collection.status)}>
                  {collection.status}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => onEdit(collection)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(collection)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {collection.notes && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">{collection.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CollectedSemenListView;
