
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
import { FrozenSemenInventory } from "@/types/breeding/stallion-detail";

interface FrozenSemenTableViewProps {
  frozenSemen: FrozenSemenInventory[];
  onEdit: (record: FrozenSemenInventory) => void;
  onDelete: (record: FrozenSemenInventory) => void;
  getQualityColor: (quality: string) => "default" | "secondary" | "outline" | "destructive";
}

const FrozenSemenTableView = ({
  frozenSemen,
  onEdit,
  onDelete,
  getQualityColor
}: FrozenSemenTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Freeze Date</TableHead>
            <TableHead>Straws</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Viability</TableHead>
            <TableHead>Tank</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frozenSemen.map((semen) => (
            <TableRow key={semen.id}>
              <TableCell className="font-medium">{semen.id}</TableCell>
              <TableCell>{semen.freezeDate}</TableCell>
              <TableCell>{semen.straws}</TableCell>
              <TableCell>
                <Badge variant={getQualityColor(semen.quality)}>
                  {semen.quality}
                </Badge>
              </TableCell>
              <TableCell>{semen.viability}</TableCell>
              <TableCell>{semen.tank}</TableCell>
              <TableCell>{semen.location}</TableCell>
              <TableCell>{semen.expiry}</TableCell>
              <TableCell>{semen.batchNumber || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(semen)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(semen)}>
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
