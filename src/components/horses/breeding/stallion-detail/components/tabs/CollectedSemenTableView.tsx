
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
import { CollectedSemen } from "@/types/breeding/stallion-detail";

interface CollectedSemenTableViewProps {
  collectedSemen: CollectedSemen[];
  onEdit: (record: CollectedSemen) => void;
  onDelete: (record: CollectedSemen) => void;
  getStatusColor: (status: string) => "default" | "secondary" | "outline" | "destructive";
}

const CollectedSemenTableView = ({
  collectedSemen,
  onEdit,
  onDelete,
  getStatusColor
}: CollectedSemenTableViewProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Concentration</TableHead>
            <TableHead>Motility</TableHead>
            <TableHead>Quality</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collectedSemen.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell className="font-medium">{collection.id}</TableCell>
              <TableCell>{collection.collectionDate}</TableCell>
              <TableCell>{collection.technician}</TableCell>
              <TableCell>{collection.volume}</TableCell>
              <TableCell>{collection.concentration}</TableCell>
              <TableCell>{collection.motility}</TableCell>
              <TableCell>{collection.quality}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(collection.status)}>
                  {collection.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(collection)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(collection)}>
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

export default CollectedSemenTableView;
