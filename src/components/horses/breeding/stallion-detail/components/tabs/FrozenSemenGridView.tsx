
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
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
  if (frozenSemen.length === 0) {
    return (
      <div className="text-center py-12">
        <Snowflake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No records found</h3>
        <p className="text-muted-foreground">No frozen semen records match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {frozenSemen.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{record.id}</span>
              </div>
              <Badge variant={getQualityColor(record.quality)}>
                {record.quality}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{record.freezeDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{record.tank} - {record.location}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Straws</p>
                <p className="font-medium">{record.straws}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Viability</p>
                <p className="font-medium">{record.viability}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Batch</p>
                <p className="font-medium">{record.batchNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expiry</p>
                <p className="font-medium">{record.expiry}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(record)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenSemenGridView;
