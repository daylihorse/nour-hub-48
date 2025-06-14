
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
  records: BreedingRecord[];
  onViewDetails: (record: BreedingRecord) => void;
  onEditRecord: (record: BreedingRecord) => void;
  onDeleteRecord: (record: BreedingRecord) => void;
}

const BreedingRecordTableView = ({ 
  records, 
  onViewDetails, 
  onEditRecord, 
  onDeleteRecord 
}: BreedingRecordTableViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Completed': return 'secondary';
      case 'Monitoring': return 'outline';
      default: return 'secondary';
    }
  };

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
            {records.map((record) => (
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
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails(record)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditRecord(record)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteRecord(record)}>
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
