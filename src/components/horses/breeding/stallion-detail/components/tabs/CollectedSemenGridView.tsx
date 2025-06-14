
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { GridSize } from "../../../components/GridSizeSelector";

interface CollectedSemenGridViewProps {
  collectedSemen: CollectedSemen[];
  onEdit: (record: CollectedSemen) => void;
  onDelete: (record: CollectedSemen) => void;
  getStatusColor: (status: string) => "default" | "secondary" | "outline" | "destructive";
  gridSize?: GridSize;
}

const CollectedSemenGridView = ({
  collectedSemen,
  onEdit,
  onDelete,
  getStatusColor,
  gridSize = 3
}: CollectedSemenGridViewProps) => {
  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-4`}>
      {collectedSemen.map((collection) => (
        <Card key={collection.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-blue-500" />
                  {collection.id}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{collection.collectionDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{collection.technician}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(collection.status)}>
                  {collection.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(collection)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(collection)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="font-medium">{collection.volume}</p>
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
            {collection.temperature && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-medium">{collection.temperature}</p>
                </div>
                {collection.ph && (
                  <div>
                    <p className="text-sm text-muted-foreground">pH</p>
                    <p className="font-medium">{collection.ph}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CollectedSemenGridView;
