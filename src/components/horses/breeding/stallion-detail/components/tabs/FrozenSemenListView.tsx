
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

interface FrozenSemenListViewProps {
  frozenSemen: FrozenSemenInventory[];
  onEdit: (record: FrozenSemenInventory) => void;
  onDelete: (record: FrozenSemenInventory) => void;
  getQualityColor: (quality: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenSemenListView = ({
  frozenSemen,
  onEdit,
  onDelete,
  getQualityColor
}: FrozenSemenListViewProps) => {
  return (
    <div className="space-y-3">
      {frozenSemen.map((semen) => (
        <div key={semen.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{semen.id}</span>
                <Badge variant={getQualityColor(semen.quality)} className="text-xs">
                  {semen.quality}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{semen.freezeDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{semen.tank} - {semen.location}</span>
                </div>
                <span>{semen.straws} straws</span>
                <span>{semen.viability} viability</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(semen)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(semen)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrozenSemenListView;
