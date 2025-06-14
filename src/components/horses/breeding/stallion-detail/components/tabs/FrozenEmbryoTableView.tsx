
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { FrozenEmbryoInventory } from "@/types/breeding/stallion-detail";

interface FrozenEmbryoTableViewProps {
  frozenEmbryos: FrozenEmbryoInventory[];
  onEdit: (record: FrozenEmbryoInventory) => void;
  onDelete: (record: FrozenEmbryoInventory) => void;
  getGradeColor: (grade: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenEmbryoTableView = ({
  frozenEmbryos,
  onEdit,
  onDelete,
  getGradeColor
}: FrozenEmbryoTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Mare Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Viability</TableHead>
            <TableHead>Tank</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Diameter</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frozenEmbryos.map((embryo) => (
            <TableRow key={embryo.id}>
              <TableCell className="font-medium">{embryo.id}</TableCell>
              <TableCell>{embryo.creationDate}</TableCell>
              <TableCell>{embryo.mareName}</TableCell>
              <TableCell>
                <Badge variant={getGradeColor(embryo.grade)}>
                  {embryo.grade}
                </Badge>
              </TableCell>
              <TableCell>{embryo.stage}</TableCell>
              <TableCell>{embryo.viability}</TableCell>
              <TableCell>{embryo.tank}</TableCell>
              <TableCell>{embryo.location}</TableCell>
              <TableCell>{embryo.diameter || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(embryo)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(embryo)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FrozenEmbryoTableView;
