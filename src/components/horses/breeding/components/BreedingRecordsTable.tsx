import { BreedingRecord } from "@/types/breeding";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreedingRecordsTableProps {
  records: BreedingRecord[];
  onEditRecord?: (record: BreedingRecord) => void;
  onViewDetails?: (record: BreedingRecord) => void;
  onDeleteRecord?: (record: BreedingRecord) => void;
}

const BreedingRecordsTable = ({
  records,
  onEditRecord = () => {},
  onViewDetails = () => {},
  onDeleteRecord = () => {},
}: BreedingRecordsTableProps) => {
  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No records found</h3>
          <p className="text-muted-foreground">
            No breeding records match your current filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "active":
        return "secondary";
      case "planned":
        return "outline";
      case "cancelled":
        return "destructive";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const getDateValue = (record: BreedingRecord) => {
    if (record.breedingDate) return formatDate(record.breedingDate);
    if (record.pregnancyStartDate) return formatDate(record.pregnancyStartDate);
    if (record.birthDate) return formatDate(record.birthDate);
    return "—";
  };

  const getAdditionalInfo = (record: BreedingRecord) => {
    switch (record.type) {
      case "breeding":
        return record.breedingMethod ? record.breedingMethod.replace("_", " ") : "—";
      case "pregnancy":
        return record.expectedDueDate ? `Due: ${formatDate(record.expectedDueDate)}` : "—";
      case "birth":
        return record.foalGender ? `${record.foalGender} foal` : "—";
      default:
        return "—";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Horse Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Mare</TableHead>
            <TableHead>Mate</TableHead>
            <TableHead>Additional Info</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.horseName}</TableCell>
              <TableCell className="capitalize">{record.type}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(record.status) as any}>
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>{getDateValue(record)}</TableCell>
              <TableCell>{record.mateName || "—"}</TableCell>
              <TableCell>{record.mateName || "—"}</TableCell>
              <TableCell>{getAdditionalInfo(record)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onViewDetails(record)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => onEditRecord(record)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(record)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditRecord(record)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDeleteRecord(record)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BreedingRecordsTable;
