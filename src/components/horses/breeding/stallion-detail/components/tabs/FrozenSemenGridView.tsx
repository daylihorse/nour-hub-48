
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Snowflake } from "lucide-react";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";

interface FrozenSemenGridViewProps {
  frozenSemen: FrozenSemenInventory[];
  onEdit: (record: FrozenSemenInventory) => void;
  onDelete: (record: FrozenSemenInventory) => void;
  getQualityColor: (quality: string) => "default" | "secondary" | "outline";
}

const FrozenSemenGridView = ({ frozenSemen, onEdit, onDelete, getQualityColor }: FrozenSemenGridViewProps) => {
  if (frozenSemen.length === 0) {
    return (
      <div className="text-center py-12">
        <Snowflake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No frozen semen records found</h3>
        <p className="text-muted-foreground">Add some frozen semen inventory to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {frozenSemen.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{record.id}</CardTitle>
              <Badge variant={getQualityColor(record.quality)}>
                {record.quality}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Tank:</span>
                <div className="text-muted-foreground">{record.tank}</div>
              </div>
              <div>
                <span className="font-medium">Straws:</span>
                <div className="text-muted-foreground">{record.straws}</div>
              </div>
              <div>
                <span className="font-medium">Viability:</span>
                <div className="text-muted-foreground">{record.viability}</div>
              </div>
              <div>
                <span className="font-medium">Location:</span>
                <div className="text-muted-foreground">{record.location}</div>
              </div>
            </div>
            
            <div className="text-sm">
              <span className="font-medium">Freeze Date:</span>
              <div className="text-muted-foreground">{new Date(record.freezeDate).toLocaleDateString()}</div>
            </div>
            
            <div className="text-sm">
              <span className="font-medium">Expiry:</span>
              <div className="text-muted-foreground">{new Date(record.expiry).toLocaleDateString()}</div>
            </div>
            
            {record.batchNumber && (
              <div className="text-sm">
                <span className="font-medium">Batch:</span>
                <div className="text-muted-foreground">{record.batchNumber}</div>
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(record)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => onDelete(record)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenSemenGridView;
