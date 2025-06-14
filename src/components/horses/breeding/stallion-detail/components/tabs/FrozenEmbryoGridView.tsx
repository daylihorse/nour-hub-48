
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Edit, Trash2, Snowflake } from "lucide-react";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";

interface FrozenEmbryoGridViewProps {
  frozenEmbryos: FrozenEmbryoInventory[];
  onEdit: (record: FrozenEmbryoInventory) => void;
  onDelete: (record: FrozenEmbryoInventory) => void;
  getGradeColor: (grade: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenEmbryoGridView = ({
  frozenEmbryos,
  onEdit,
  onDelete,
  getGradeColor
}: FrozenEmbryoGridViewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {frozenEmbryos.map((embryo) => (
        <Card key={embryo.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  {embryo.id}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {embryo.creationDate}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Mare: {embryo.mareName}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getGradeColor(embryo.grade)}>
                  {embryo.grade}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => onEdit(embryo)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(embryo)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Stage</p>
                  <p className="font-medium">{embryo.stage}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Viability</p>
                <p className="font-medium">{embryo.viability}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tank</p>
                <p className="font-medium">{embryo.tank}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{embryo.location}</p>
              </div>
            </div>
            {embryo.diameter && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Diameter: {embryo.diameter}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenEmbryoGridView;
