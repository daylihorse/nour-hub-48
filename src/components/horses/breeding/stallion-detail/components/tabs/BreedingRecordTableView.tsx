
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { BreedingRecord } from "@/types/breeding/stallion-detail";

interface BreedingRecordTableViewProps {
  breedingRecords: BreedingRecord[];
  onEdit: (record: BreedingRecord) => void;
  onDelete: (record: BreedingRecord) => void;
  getStatusColor: (status: string) => "default" | "secondary" | "outline";
}

const BreedingRecordTableView = ({ 
  breedingRecords,
  onEdit,
  onDelete,
  getStatusColor
}: BreedingRecordTableViewProps) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case 'Confirmed Pregnant': return 'text-green-600';
      case 'Live Foal': return 'text-blue-600';
      case 'Pending': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Record ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Mare</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Veterinarian</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {breedingRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.mareName}</TableCell>
                <TableCell>{record.mareOwner}</TableCell>
                <TableCell>{record.method}</TableCell>
                <TableCell>
                  <span className={getResultColor(record.result)}>
                    {record.result}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>Dr. {record.veterinarian}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => console.log('View details:', record)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(record)}>
                      <Edit2 className="h-4 w-4" />
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
      </CardContent>
    </Card>
  );
};

export default BreedingRecordTableView;
