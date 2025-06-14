
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, TestTube, Edit, Trash2 } from "lucide-react";
import { CollectedSemen } from "@/types/breeding/stallion-detail";

interface CollectedSemenGridViewProps {
  collectedSemen: CollectedSemen[];
  onEdit: (record: CollectedSemen) => void;
  onDelete: (record: CollectedSemen) => void;
  getStatusColor: (status: string) => "default" | "secondary" | "outline" | "destructive";
}

const CollectedSemenGridView = ({
  collectedSemen,
  onEdit,
  onDelete,
  getStatusColor
}: CollectedSemenGridViewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collectedSemen.map((collection) => (
        <Card key={collection.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{collection.id}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{collection.collectionDate}</span>
                  <span>•</span>
                  <span>{collection.technician}</span>
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Volume</p>
                  <p className="font-medium">{collection.volume}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Concentration</p>
                <p className="font-medium">{collection.concentration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Motility</p>
                <p className="font-medium">{collection.motility}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quality</p>
                <p className="font-medium">{collection.quality}</p>
              </div>
            </div>
            {collection.notes && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="text-sm">{collection.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CollectedSemenGridView;
