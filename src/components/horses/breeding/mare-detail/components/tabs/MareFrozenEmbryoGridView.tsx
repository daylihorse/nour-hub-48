
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Snowflake, Calendar, User, MapPin, Edit, Trash2, Eye, ArrowRight } from "lucide-react";
import { MareFrozenEmbryoInventory } from "@/types/breeding/mare-embryo";
import { GridSize } from "../../../components/GridSizeSelector";

interface MareFrozenEmbryoGridViewProps {
  frozenEmbryos: MareFrozenEmbryoInventory[];
  onEdit: (record: MareFrozenEmbryoInventory) => void;
  onDelete: (record: MareFrozenEmbryoInventory) => void;
  onView?: (record: MareFrozenEmbryoInventory) => void;
  getGradeColor: (grade: string) => "default" | "secondary" | "outline" | "destructive";
  gridSize: GridSize;
}

const MareFrozenEmbryoGridView = ({
  frozenEmbryos,
  onEdit,
  onDelete,
  onView,
  getGradeColor,
  gridSize
}: MareFrozenEmbryoGridViewProps) => {
  const getGridColumns = () => {
    switch (gridSize) {
      case 2:
        return "grid-cols-1 lg:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (frozenEmbryos.length === 0) {
    return (
      <div className="text-center py-12">
        <Snowflake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">No records found</h3>
        <p className="text-muted-foreground">No frozen embryo records match your criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridColumns()} gap-4`}>
      {frozenEmbryos.map((record) => (
        <Card key={record.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-purple-500" />
                <span className="font-medium">{record.id}</span>
              </div>
              <Badge variant={getGradeColor(record.grade)}>
                {record.grade}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{record.creationDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{record.mareName}</span>
                <ArrowRight className="h-3 w-3" />
                <span>{record.stallionName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{record.tank} - {record.location}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Stage</p>
                <p className="font-medium">{record.stage}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Viability</p>
                <p className="font-medium">{record.viability}</p>
              </div>
              {record.diameter && (
                <div>
                  <p className="text-muted-foreground">Diameter</p>
                  <p className="font-medium">{record.diameter}</p>
                </div>
              )}
              {record.transferDate && (
                <div>
                  <p className="text-muted-foreground">Transfer Date</p>
                  <p className="font-medium">{record.transferDate}</p>
                </div>
              )}
            </div>

            {record.transferResult && (
              <div className="mb-4">
                <Badge variant="outline" className="text-xs">
                  Transfer: {record.transferResult}
                </Badge>
              </div>
            )}
            
            <div className="flex gap-2">
              {onView && (
                <Button variant="ghost" size="sm" onClick={() => onView(record)}>
                  <Eye className="h-4 w-4" />
                </Button>
              )}
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

export default MareFrozenEmbryoGridView;
