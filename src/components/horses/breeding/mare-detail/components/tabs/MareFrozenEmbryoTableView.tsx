
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
import { MareFrozenEmbryoInventory } from "@/types/breeding/mare-embryo";

interface MareFrozenEmbryoTableViewProps {
  frozenEmbryos: MareFrozenEmbryoInventory[];
  onEdit: (record: MareFrozenEmbryoInventory) => void;
  onDelete: (record: MareFrozenEmbryoInventory) => void;
  getGradeColor: (grade: string) => "default" | "secondary" | "outline" | "destructive";
}

const MareFrozenEmbryoTableView = ({
  frozenEmbryos,
  onEdit,
  onDelete,
  getGradeColor
}: MareFrozenEmbryoTableViewProps) => {
  if (frozenEmbryos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">No records found</h3>
        <p className="text-muted-foreground">No frozen embryo records match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Mare Name</TableHead>
            <TableHead>Stallion Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Tank</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Viability</TableHead>
            <TableHead>Transfer Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frozenEmbryos.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>{record.creationDate}</TableCell>
              <TableCell>{record.mareName}</TableCell>
              <TableCell>{record.stallionName}</TableCell>
              <TableCell>
                <Badge variant={getGradeColor(record.grade)}>
                  {record.grade}
                </Badge>
              </TableCell>
              <TableCell>{record.stage}</TableCell>
              <TableCell>{record.tank}</TableCell>
              <TableCell>{record.location}</TableCell>
              <TableCell>{record.viability}</TableCell>
              <TableCell>
                {record.transferResult ? (
                  <Badge variant="outline">
                    {record.transferResult}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">Not transferred</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(record)}>
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

export default MareFrozenEmbryoTableView;
