
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, Edit, Trash2 } from "lucide-react";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";

interface FrozenEmbryoListViewProps {
  frozenEmbryos: FrozenEmbryoInventory[];
  onEdit: (record: FrozenEmbryoInventory) => void;
  onDelete: (record: FrozenEmbryoInventory) => void;
  getGradeColor: (grade: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenEmbryoListView = ({
  frozenEmbryos,
  onEdit,
  onDelete,
  getGradeColor
}: FrozenEmbryoListViewProps) => {
  return (
    <div className="space-y-3">
      {frozenEmbryos.map((embryo) => (
        <Card key={embryo.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="font-medium">{embryo.id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{embryo.creationDate}</span>
                </div>
                <span className="text-sm text-muted-foreground">{embryo.mareName}</span>
                <div className="flex gap-4 text-sm">
                  <span>Stage: {embryo.stage}</span>
                  <span>Viability: {embryo.viability}</span>
                  <span>Tank: {embryo.tank}</span>
                  <span>Location: {embryo.location}</span>
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
            {embryo.diameter && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Diameter: {embryo.diameter}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FrozenEmbryoListView;
