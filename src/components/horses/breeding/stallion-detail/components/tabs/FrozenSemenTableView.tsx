
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
import { Edit, Trash2, Snowflake } from "lucide-react";
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";

interface FrozenSemenTableViewProps {
  frozenSemen: FrozenSemenInventory[];
  onEdit: (record: FrozenSemenInventory) => void;
  onDelete: (record: FrozenSemenInventory) => void;
  getQualityColor: (quality: string) => "default" | "secondary" | "outline";
}

const FrozenSemenTableView = ({ frozenSemen, onEdit, onDelete, getQualityColor }: FrozenSemenTableViewProps) => {
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
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tank</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Straws</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Viability</TableHead>
            <TableHead>Freeze Date</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frozenSemen.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id}</TableCell>
              <TableCell>{record.tank}</TableCell>
              <TableCell>{record.location}</TableCell>
              <TableCell>{record.straws}</TableCell>
              <TableCell>
                <Badge variant={getQualityColor(record.quality)}>
                  {record.quality}
                </Badge>
              </TableCell>
              <TableCell>{record.viability}</TableCell>
              <TableCell>{new Date(record.freezeDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(record.expiry).toLocaleDateString()}</TableCell>
              <TableCell>{record.batchNumber || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(record)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete(record)}>
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

export default FrozenSemenTableView;
