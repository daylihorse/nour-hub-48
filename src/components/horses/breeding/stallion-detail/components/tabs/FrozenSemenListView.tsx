
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Calendar, MapPin, Edit, Trash2 } from "lucide-react";
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
    <div className="space-y-4">
      {frozenSemen.map((record) => (
        <Card key={record.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Snowflake className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{record.id}</span>
                  <Badge variant={getQualityColor(record.quality)}>
                    {record.quality}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{record.freezeDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{record.tank}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Straws: </span>
                    <span className="font-medium">{record.straws}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Viability: </span>
                    <span className="font-medium">{record.viability}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(record)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenSemenListView;
