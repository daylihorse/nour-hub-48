
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TestTube, 
  Calendar,
  User,
  Edit,
  Trash2
} from "lucide-react";
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
        <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <TestTube className="h-5 w-5 text-blue-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{collection.id}</span>
                <Badge variant={getStatusColor(collection.status)} className="text-xs">
                  {collection.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{collection.collectionDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{collection.technician}</span>
                </div>
                <span>{collection.volume}</span>
                <span>{collection.quality}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(collection)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(collection)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectedSemenListView;
