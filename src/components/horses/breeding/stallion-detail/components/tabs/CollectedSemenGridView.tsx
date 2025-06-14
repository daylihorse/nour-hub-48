
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestTube, Calendar, User, Edit, Trash2 } from "lucide-react";
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
  if (collectedSemen.length === 0) {
    return (
      <div className="text-center py-12">
        <TestTube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No records found</h3>
        <p className="text-muted-foreground">No semen collection records match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {collectedSemen.map((collection) => (
        <Card key={collection.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{collection.id}</span>
              </div>
              <Badge variant={getStatusColor(collection.status)}>
                {collection.status}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{collection.collectionDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{collection.technician}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Volume</p>
                <p className="font-medium">{collection.volume}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Concentration</p>
                <p className="font-medium">{collection.concentration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Motility</p>
                <p className="font-medium">{collection.motility}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Quality</p>
                <p className="font-medium">{collection.quality}</p>
              </div>
            </div>
            
            {collection.notes && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {collection.notes}
              </p>
            )}
            
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(collection)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(collection)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CollectedSemenGridView;
