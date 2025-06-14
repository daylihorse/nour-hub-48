
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Snowflake, 
  Calendar,
  MapPin,
  Edit,
  Trash2
} from "lucide-react";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";

interface FrozenSemenGridViewProps {
  frozenSemen: FrozenSemenInventory[];
  onEdit: (record: FrozenSemenInventory) => void;
  onDelete: (record: FrozenSemenInventory) => void;
  getQualityColor: (quality: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenSemenGridView = ({
  frozenSemen,
  onEdit,
  onDelete,
  getQualityColor
}: FrozenSemenGridViewProps) => {
  return (
    <div className="grid gap-4">
      {frozenSemen.map((semen) => (
        <Card key={semen.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Snowflake className="h-4 w-4 text-blue-500" />
                  {semen.id}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Frozen: {semen.freezeDate}</span>
                  <span>•</span>
                  <span>Expires: {semen.expiry}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={getQualityColor(semen.quality)}>
                  {semen.quality}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(semen)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(semen)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Straws</p>
                <p className="font-medium">{semen.straws}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Viability</p>
                <p className="font-medium">{semen.viability}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Tank</p>
                  <p className="font-medium">{semen.tank}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{semen.location}</p>
              </div>
            </div>
            {semen.batchNumber && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Batch: {semen.batchNumber}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenSemenGridView;
